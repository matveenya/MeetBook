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
          Member {{ user.uid }}
        </p>
      </div>
    </div>

    <div class="h-24 bg-gray-800 flex items-center justify-center gap-6">
      <button
        @click="toggleMic"
        :class="isMicOn ? 'bg-gray-600' : 'bg-red-500'"
        class="p-4 rounded-full text-white"
      >
        <i :class="isMicOn ? 'pi pi-microphone' : 'pi pi-microphone-slash'"></i>
      </button>
      <button
        @click="leaveCall"
        class="bg-red-600 hover:bg-red-700 p-4 px-8 rounded-full text-white font-bold"
      >
        End call
      </button>
      <button
        @click="toggleVideo"
        :class="isVideoOn ? 'bg-gray-600' : 'bg-red-500'"
        class="p-4 rounded-full text-white"
      >
        <i :class="isVideoOn ? 'pi pi-video' : 'pi pi-eye-slash'"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AgoraRTC, {
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
  type IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng';
import apiClient from '@/api/client';

const props = defineProps<{ meetingId: string }>();
const emit = defineEmits(['close']);

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
const localTracks = ref<{
  videoTrack: ICameraVideoTrack;
  audioTrack: IMicrophoneAudioTrack;
} | null>(null);

const remoteUsers = ref<IAgoraRTCRemoteUser[]>([]);
const isMicOn = ref(true);
const isVideoOn = ref(true);

const initCall = async () => {
  const { data } = await apiClient.get(`/api/agora/token?channelName=${props.meetingId}`);

  client.on('user-published', async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === 'video') {
      if (!remoteUsers.value.find(u => u.uid === user.uid)) remoteUsers.value.push(user);

      setTimeout(() => {
        const el = document.getElementById(`remote-player-${user.uid}`);
        if (el && user.videoTrack) {
          user.videoTrack.play(el.id);
        }
      }, 200);
    }
    if (mediaType === 'audio') user.audioTrack?.play();
  });

  client.on('user-unpublished', user => {
    remoteUsers.value = remoteUsers.value.filter(u => u.uid !== user.uid);
  });

  await client.join(data.appId, props.meetingId, data.token, data.uid);

  const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
  localTracks.value = { videoTrack, audioTrack };
  videoTrack.play('local-player');
  await client.publish([audioTrack, videoTrack]);
};

const toggleMic = async () => {
  isMicOn.value = !isMicOn.value;
  if (localTracks.value?.audioTrack) {
    await localTracks.value.audioTrack.setEnabled(isMicOn.value);
  }
};

const toggleVideo = async () => {
  isVideoOn.value = !isVideoOn.value;
  await localTracks.value?.videoTrack.setEnabled(isVideoOn.value);
};

const leaveCall = async () => {
  localTracks.value?.videoTrack.close();
  localTracks.value?.audioTrack.close();
  await client.leave();
  emit('close');
};

onMounted(initCall);
onUnmounted(leaveCall);
</script>
