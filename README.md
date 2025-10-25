# 🏎️ F1 Quiz App

**Prüfungsleistung - Webentwicklung**  
**Student:** Paul  
**Kontakt:** ---

Eine interaktive Quiz-Webanwendung rund um die Formel 1. Die App testet spielerisch das Wissen über Fahrer, Teams, Rennstrecken und mehr durch bildbasierte Fragen.

---

## Projektbeschreibung

Dieses Projekt ist ein nicht-kommerzielles Fanprojekt und dient ausschließlich zu Bildungs- und Unterhaltungszwecken. Es besteht keine offizielle Verbindung zur Formel 1, der FIA oder anderen F1-Organisationen. Alle verwendeten Grafiken wurden selbst erstellt.

### Features

- **Startbildschirm** mit Logo und Fortschrittsanzeige
- **Fragen-Übersicht** mit visueller Darstellung aller Fragen (beantwortet/offen)
- **Interaktive Frageansicht** mit Bildern und Eingabefeld
- **Direkte Rückmeldung** bei richtigen/falschen Antworten
- **Fortschrittsspeicherung** (localStorage)
- **Completion-System** mit "Gewonnen"-Popup bei allen beantworteten Fragen
- **Responsive Design** optimiert für Mobile und Desktop
- **Impressum** mit allen rechtlichen Informationen

---

## Technologien

- **Vue 3** (Composition API)
- **Vue Router** für Navigation
- **Pinia** für State Management
- **Vite** als Build-Tool und Dev-Server
- **Custom CSS** mit CSS Variables

---

## Installation & Start

### Voraussetzungen

- **Node.js** (Version 16 oder höher)
- **npm** (wird mit Node.js installiert)

### Schritt 1: Abhängigkeiten installieren

Nach dem Entpacken der ZIP-Datei öffnen Sie ein Terminal im Projektverzeichnis und führen Sie folgenden Befehl aus:

```bash
npm install
```

### Schritt 2: Entwicklungsserver starten

```bash
npm run dev
```

Die Anwendung ist nun unter **http://localhost:5173** erreichbar.

---

## Nutzung

1. **Startbildschirm**: Zeigt Logo und aktuellen Fortschritt
2. **"Start" klicken**: Gelangt zur Fragen-Übersicht
3. **Frage auswählen**: Klick auf ein Bild öffnet die Detailansicht
4. **Antwort eingeben**: Text eingeben und Enter drücken oder Submit-Button klicken
5. **Fortschritt verfolgen**: Beantwortete Fragen werden markiert
6. **Quiz abschließen**: Bei 100% erscheint ein "Gewonnen"-Popup

### Zusätzliche Funktionen

- **Zurück-Button** (←): Navigation zurück
- **Hilfe-Button** (?): Zeigt Hinweise zur Eingabe
- **Reset-Button** (↻): Setzt Fortschritt zurück
- **Info-Button** (i): Öffnet Impressum

---

## Besonderheiten der Implementierung

- **Pinia Store** verwaltet Fragen, Fortschritt und Antworten
- **localStorage** speichert Fortschritt persistent
- **Lazy Loading** für Bilder
- **Lokale SVG-Icons** (keine externen Font-Libraries)

### Responsive Design
- Mobile-First Ansatz
- Desktop-Version mit fester Breite und Hintergrund
- Touch-optimierte Interaktionen

---

## Lizenz & Urheberrecht

Dieses Projekt ist eine Prüfungsleistung und dient ausschließlich Bildungszwecken. Alle selbst erstellten Grafiken und Illustrationen sind künstlerische Interpretationen. Marken und Namen bleiben Eigentum ihrer jeweiligen Rechteinhaber.

---

## Autor

**Name Nachname**  
Matrikelnummer: 
E-Mail: 

---

*Erstellt mit Vue 3 + Vite*
  
