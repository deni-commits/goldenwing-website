# /ui-review

Führe den design-reviewer Agent auf den betroffenen Seiten/Komponenten aus.

## Was passiert
1. Playwright öffnet die Seite(n)
2. Screenshots werden erstellt (Desktop/Tablet/Mobile)
3. Console und Network Logs werden geprüft
4. Umfassender Design-Review wird durchgeführt

## Output
Ein priorisierter Report mit:
- Summary Grade (A-F)
- Strengths
- High Priority Issues (Must Fix)
- Medium Priority Issues
- Low Priority / Polish
- Accessibility Check
- Performance Check
- Top 5 Next Actions

## Verwendung
```
/ui-review
```

Oder mit spezifischem Scope:
```
/ui-review homepage
/ui-review /leistungen
/ui-review Header component
```

## Review Kriterien

### Visual Design
- Spacing und Alignment
- Typografie-Hierarchie
- Farbkonsistenz
- Shadow/Depth Usage

### Responsiveness
- Mobile Layout
- Tablet Layout
- Desktop Layout
- No Overflow Issues

### Accessibility
- Focus States
- Color Contrast (WCAG AA)
- Alt Texts
- ARIA Labels

### Performance
- Image Optimization
- Layout Shifts
- Console Errors
- Network Issues
