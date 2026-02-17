# /ui-iterate

Implementiere die angeforderte UI-Änderung und führe dann einen vollständigen Playwright Verify Loop durch:

## Workflow
1. **Verstehe die Anforderung**
   - Was soll geändert werden?
   - Welche Komponenten/Seiten sind betroffen?

2. **Implementiere die Änderung**
   - Folge dem Design System (Apple-like, premium, minimal)
   - Verwende shadcn/ui Komponenten
   - Tailwind Utility Classes

3. **Playwright Verification**
   - Screenshots: Desktop (1440×900), Tablet (768×1024), Mobile (390×844)
   - Console Logs prüfen
   - Network Errors prüfen

4. **Iteration**
   - Bei Fehlern: automatisch fixen und erneut prüfen
   - Wiederholen bis clean

## Output Format
```markdown
## UI Iteration Complete

### Files Changed
- `path/to/file.tsx` - [Beschreibung]
- ...

### Before/After
- Vorher: [Beschreibung]
- Nachher: [Beschreibung]

### Verification Results
- [ ] Desktop Screenshot: OK
- [ ] Tablet Screenshot: OK
- [ ] Mobile Screenshot: OK
- [ ] Console: No Errors
- [ ] Network: No Errors

### Manual Checks (falls nötig)
- [ ] ...
```

## Quality Checklist
- [ ] Responsive auf allen Breakpoints
- [ ] Hover/Focus States funktionieren
- [ ] Animationen smooth
- [ ] Accessibility gegeben
- [ ] Performance akzeptabel
