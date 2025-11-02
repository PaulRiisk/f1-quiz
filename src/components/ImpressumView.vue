<template>
  <div class="impressum-view">
    
    <!-- Impressum Content -->
    <div class="impressum-content">
      <section class="section">
        <h2>Angaben zum Autor</h2>
        <p>Paul Rist</p>
        <p>Matrikelnummer: s3005213</p>
        <p>E-Mail: s3005123@edu.dhsn.de</p>
      </section>

      <section class="section">
        <h2>Datenschutz</h2>
        <p>
          Diese Anwendung speichert den Spielfortschritt lokal in deinem Browser (localStorage). 
          Es werden keine persönlichen Daten erhoben oder an Dritte weitergegeben.
        </p>
      </section>

      <section class="section disclaimer">
        <p>
          <strong>Hinweis:</strong> Dieses Quiz ist rein fiktional und dient ausschließlich der Unterhaltung. 
          Alle Inhalte wurden mit größter Sorgfalt erstellt, für die Richtigkeit der Informationen wird jedoch keine Gewähr übernommen.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
// No script part needed
</script>

<style scoped>
.impressum-view {
  min-height: 100vh;
  background-color: var(--dark-bg);
  padding: 1.25rem;
  padding-top: 6rem;
}

.impressum-content {
  max-width: 50rem;
  margin: 0 auto;
  color: var(--text-white);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-white);
}

.section {
  margin-bottom: 2rem;
  background-color: var(--darker-bg);
  padding: 1.5rem;
  border-radius: 1rem;
}

.section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-white);
}

.section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-white);
}

.section p {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 0.75rem;
}

.section p:last-child {
  margin-bottom: 0;
}

.disclaimer {
  background-color: var(--image-bg);
  border-left: 0.25rem solid var(--primary-red);
}

.disclaimer p {
  margin: 0;
}
</style>
