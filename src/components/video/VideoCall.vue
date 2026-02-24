<template>
  <div class="fixed inset-0 bg-black z-50 flex flex-col">
    <div id="video-grid" class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-900">
      <div
        id="local-player"
        class="relative bg-gray-800 rounded-2xl overflow-hidden border-2 border-[#3E5CE9]"
      >
        <p class="absolute bottom-4 left-4 text-white z-10 bg-black/50 px-2 rounded">You</p>
      </div>
      <div
        v-for="user in remoteUsers"
        :key="user.uid"
        :id="'remote-player-' + user.uid"
        class="relative bg-gray-800 rounded-2xl overflow-hidden"
      >
        <p class="absolute bottom-4 left-4 text-white z-10 bg-black/50 px-2 rounded">
          {{ getRemoteUserLabel(user.uid) }}
        </p>
      </div>
    </div>

    <div class="h-24 bg-gray-800 flex items-center justify-center gap-6">
      <Button
        @click="toggleMic"
        :fluid="false"
        :variant="isMicOn ? 'callControl' : 'callControlOff'"
        callIcon="mic"
        :off="!isMicOn"
      />
      <Button @click="leaveCall" :fluid="false" variant="callEnd"> End call </Button>
      <Button
        @click="toggleVideo"
        :fluid="false"
        :variant="isVideoOn ? 'callControl' : 'callControlOff'"
        callIcon="video"
        :off="!isVideoOn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useVideoCall } from '@/composables/useVideoCall';
import Button from '../ui/Button.vue';

const props = defineProps<{ meetingId: string }>();
const emit = defineEmits(['close']);

const {
  remoteUsers,
  isMicOn,
  isVideoOn,
  getRemoteUserLabel,
  initCall,
  toggleMic,
  toggleVideo,
  leaveCall,
} = useVideoCall(props.meetingId, () => emit('close'));

onMounted(initCall);
onUnmounted(() => leaveCall(false));
</script>
