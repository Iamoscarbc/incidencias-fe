<template>
  <div class="horizontal-timeline">
    <div v-for="(step, index) in steps" :key="index" class="timeline-step" :class="'step-'+(index+1)">
      <div class="timeline-step-info">
        <div class="step-icon" :class="{ 'completed': step.completed }">
          {{ step.completed ? '✓' : index + 1 }}
        </div>
        <div class="step-title">{{ step.title }}</div>
      </div>
      <div class="line" v-if="index < steps.length - 1"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ["steps"],
});
</script>

<style scoped>
.horizontal-timeline {
  display: flex;
  align-items: center;
  width: 100%;
}

.timeline-step {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.step-3{
  width: 80px;
}

.timeline-step-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.step-icon {
  width: 40px;
  height: 40px;
  border: 2px solid #6a64ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #6a64ff;
}

.completed {
  background-color: #6a64ff;
  color: #ffffff;
}

.step-title {
  margin-top: 8px;
  text-align: center;
}

.line {
  width: 100%; /* Ancho de las líneas entre pasos */
  border-top: 2px solid #6a64ff; /* Color de las líneas */
  margin-bottom: 20px;
}
</style>