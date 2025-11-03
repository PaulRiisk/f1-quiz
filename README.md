# 🏎️ F1 Quiz App

**Prüfungsleistung - Webentwicklung**  
**Student:** Paul  
**Kontakt:** ---

Eine interaktive Quiz-Webanwendung rund um die Formel 1. Die App testet spielerisch das Wissen über Fahrer, Teams, Rennstrecken und mehr durch bildbasierte Fragen.

## Projektbeschreibung

Dieses Projekt ist ein nicht-kommerzielles Fan- und Prüfungsprojekt und dient ausschließlich zu Bildungs- und Unterhaltungszwecken. Es besteht keine offizielle Verbindung zur Formel 1, der FIA oder anderen F1-Organisationen. Alle verwendeten Grafiken wurden selbst erstellt.

## Anwendung testen

Es gibt drei Möglichkeiten, die Anwendung zu testen:

### Option 1: Gehostete Website besuchen

Die Anwendung ist testweise gehostet und kann unter folgender URL aufgerufen werden:
**https://f1-quiz.paulrist.io/**

Die Zugangsdaten finden Sie in der Datei `Zugang.txt`.
---
### Option 2: Entwicklungsserver (empfohlen)

Voraussetzungen: Node.js (Version 16 oder höher)

**Schritt 1 (optional):** Abhängigkeiten installieren

Die benötigten Module sind bereits im ZIP-Paket enthalten. Sollte es dennoch zu Problemen kommen oder wenn Sie die Abhängigkeiten neu installieren möchten, führen Sie im Projektverzeichnis folgenden Befehl aus:

```
npm install
```

**Schritt 2:** Entwicklungsserver starten

Starten Sie die Entwicklungsanwendung mit folgendem Befehl:

```
npm run dev
```

Die Anwendung ist dann standardmäßig unter `http://localhost:5173` erreichbar.
---
### Option 3: Vorbereiteter Build verwenden

Falls Sie den vorbereiteten Build testen möchten, können Sie die Build-Version starten:

```
npm run preview
```

Die Build-Version ist dann unter `http://localhost:4173` erreichbar und unter `dist/` zu finden.

## Features

- **Startbildschirm** mit Logo und Fortschrittsanzeige
- **Fragen-Übersicht** mit visueller Darstellung aller Fragen (beantwortet/offen)
- **Interaktive Frageansicht** mit Bildern und Eingabefeld
- **Fortschrittsspeicherung** (über localStorage)

## Technologien

- **Vue 3** (Composition API)
- **Vue Router** für Navigation
- **Pinia Store** für State Management
- **Vite** als Build-Tool und Dev-Server
- **Custom CSS** mit CSS Variables


