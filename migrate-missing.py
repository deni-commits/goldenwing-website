import sqlite3
import subprocess

SQLITE_DB = "goldenwing.db"
PG_CONN = "postgresql://postgres:dS9B337iUbqUDTLI@db.gzhvvwkoglylibvrtiqo.supabase.co:5432/postgres"
SCHEMA = "payload"
ENV = {"PGPASSWORD": "dS9B337iUbqUDTLI", "PATH": "/usr/bin:/bin"}

# All tables in correct order
TABLES = [
    "users", "media", "categories", "categories_locales",
    "posts", "posts_locales", "posts_rels", "posts_expert_quotes", "posts_faqs",
    "posts_sources", "posts_sources_locales", "posts_table_of_contents",
    "projects", "projects_locales", "projects_gallery", "projects_gallery_locales",
    "projects_industry", "projects_results", "projects_results_locales",
    "projects_services", "projects_solution_points", "projects_tags",
    "services", "services_locales", "services_features", "services_process",
    "sub_services", "sub_services_locales", "sub_services_rels",
    "sub_services_benefits", "sub_services_deliverables", "sub_services_features",
    "sub_services_process", "sub_services_use_cases",
    "team_members", "team_members_locales", "team_members_awards",
    "team_members_credentials", "team_members_expertise", "team_members_expertise_locales",
    "team_members_languages", "team_members_notable_clients",
    "partners", "partners_locales",
    "testimonials", "testimonials_locales",
    "resources", "resources_locales",
    "leads", "tool_analyses",
]

def psql(sql):
    r = subprocess.run(["psql", PG_CONN, "-c", sql], capture_output=True, text=True, env=ENV)
    return r.returncode == 0, r.stderr.strip()

def get_pg_cols(table):
    r = subprocess.run(
        ["psql", PG_CONN, "-t", "-A", "-c",
         f"SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='{SCHEMA}' AND table_name='{table}' ORDER BY ordinal_position"],
        capture_output=True, text=True, env=ENV
    )
    cols = {}
    for line in r.stdout.strip().split("\n"):
        if "|" in line:
            name, dtype = line.strip().split("|", 1)
            cols[name] = dtype
    return cols

def escape(v, dtype=None):
    if v is None:
        return "NULL"
    if dtype and 'boolean' in dtype.lower():
        if isinstance(v, int):
            return "TRUE" if v else "FALSE"
        return "TRUE" if str(v).lower() in ('1', 'true', 't', 'yes') else "FALSE"
    if isinstance(v, (int, float)) and not isinstance(v, bool):
        return str(v)
    escaped = str(v).replace("'", "''").replace("\\", "\\\\")
    return f"E'{escaped}'"

# Disable FK constraints
print("Disabling FK constraints...")
psql("SET session_replication_role = replica;")

conn = sqlite3.connect(SQLITE_DB)
conn.row_factory = sqlite3.Row

total_new = 0
total_skip = 0
errors = 0

for table in TABLES:
    try:
        cur = conn.execute(f"SELECT * FROM {table}")
        rows = cur.fetchall()
        if not rows:
            continue

        sqlite_cols = [d[0] for d in cur.description]
        pg_col_info = get_pg_cols(table)
        common = [c for c in sqlite_cols if c in pg_col_info]
        if not common:
            continue

        col_list = ", ".join([f'"{c}"' for c in common])
        new_count = 0

        # Build all inserts with FK disabled
        sql_batch = "SET session_replication_role = replica;\n"
        
        for row in rows:
            vals = ", ".join([escape(row[c], pg_col_info.get(c, '')) for c in common])
            sql = f"INSERT INTO {SCHEMA}.{table} ({col_list}) VALUES ({vals}) ON CONFLICT DO NOTHING;"
            ok, err = psql(f"SET session_replication_role = replica; {sql}")
            if ok:
                new_count += 1
            else:
                # Try without ON CONFLICT
                sql2 = f"SET session_replication_role = replica; {sql.replace(' ON CONFLICT DO NOTHING', '')}"
                ok2, err2 = psql(sql2)
                if ok2:
                    new_count += 1
                elif "duplicate" in err2 or "already exists" in err2:
                    total_skip += 1
                else:
                    errors += 1
                    if errors <= 10:
                        print(f"  ERR {table}: {err2[:100]}")

        if new_count > 0:
            total_new += new_count
            print(f"✅ {table}: {new_count}/{len(rows)}")
    except Exception as e:
        if "no such table" not in str(e):
            print(f"❌ {table}: {str(e)[:80]}")
        errors += 1

# Re-enable FK constraints
psql("SET session_replication_role = DEFAULT;")
print(f"\n{'='*50}")
print(f"✅ New rows inserted: {total_new}")
print(f"⏭️  Already existed: {total_skip}")
print(f"❌ Errors: {errors}")

conn.close()
