#!/bin/bash
# Fix unused imports and variables

cd "$(dirname "$0")/.."

# Files to process
FILES=$(npx eslint . --format json 2>/dev/null | jq -r '.[] | select(.messages | length > 0) | .filePath' | sort | uniq)

for FILE in $FILES; do
  echo "Processing: $FILE"
  
  # Remove unused lucide-react imports (specific icons)
  # Star, Phone, Key, Globe, Badge, Sparkles, CardTitle
  sed -i '' -E 's/, Star([,}])/ \1/g; s/Star, //g; s/{ Star }/{ }/g' "$FILE" 2>/dev/null
  sed -i '' -E 's/, Phone([,}])/ \1/g; s/Phone, //g; s/{ Phone }/{ }/g' "$FILE" 2>/dev/null
  sed -i '' -E 's/, Key([,}])/ \1/g; s/Key, //g; s/{ Key }/{ }/g' "$FILE" 2>/dev/null
  sed -i '' -E 's/, Globe([,}])/ \1/g; s/Globe, //g; s/{ Globe }/{ }/g' "$FILE" 2>/dev/null
  sed -i '' -E 's/, Badge([,}])/ \1/g; s/Badge, //g; s/{ Badge }/{ }/g' "$FILE" 2>/dev/null
  sed -i '' -E 's/, Sparkles([,}])/ \1/g; s/Sparkles, //g; s/{ Sparkles }/{ }/g' "$FILE" 2>/dev/null
  sed -i '' -E 's/, CardTitle([,}])/ \1/g; s/CardTitle, //g; s/{ CardTitle }/{ }/g' "$FILE" 2>/dev/null
  
  # Prefix unused variables with underscore
  # baseUrl, isEn, isRu -> _baseUrl, _isEn, _isRu
  sed -i '' -E 's/const baseUrl = /const _baseUrl = /g' "$FILE" 2>/dev/null
  sed -i '' -E 's/const isEn = /const _isEn = /g' "$FILE" 2>/dev/null
  sed -i '' -E 's/const isRu = /const _isRu = /g' "$FILE" 2>/dev/null
  
  # Fix unused catch params: (err) -> (_err) or (error) -> (_error)
  sed -i '' -E 's/catch \(err\)/catch (_err)/g' "$FILE" 2>/dev/null
  sed -i '' -E 's/catch \(error\)/catch (_error)/g' "$FILE" 2>/dev/null
  
  # Fix unused function params: siteName -> _siteName
  sed -i '' -E 's/siteName: string/siteName: _string/g' "$FILE" 2>/dev/null
done

echo "Done. Run eslint to verify."
