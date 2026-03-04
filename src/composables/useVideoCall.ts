import { ref } from 'vue';
import AgoraRTC, {
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
  type UID,
} from 'agora-rtc-sdk-ng';
import { fetchAgoraTokenRequest } from '@/api/modules/agora';
import { fetchUsersRequest } from '@/api/modules/users';
import { mapUsersToLabelMap } from '@/utils/userMapping';

export function useVideoCall(meetingId: string, onClose: () => void) {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  const localTracks = ref<{
    videoTrack: ICameraVideoTrack;
    audioTrack: IMicrophoneAudioTrack;
  } | null>(null);

  const remoteUsers = ref<Array<{ uid: UID }>>([]);
  const isMicOn = ref(true);
  const isVideoOn = ref(true);
  const userLabelsById = ref<Record<string, string>>({});
  const isLeaving = ref(false);

  const loadUserLabels = async () => {
    try {
      const users = await fetchUsersRequest();
      userLabelsById.value = mapUsersToLabelMap(users);
    } catch (error) {
      console.error('Failed to load user labels:', error);
    }
  };

  const getRemoteUserLabel = (uid: UID) => userLabelsById.value[String(uid)] || 'Member';

  const initCall = async () => {
    await loadUserLabels();
    const agoraToken = await fetchAgoraTokenRequest(meetingId);
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      if (mediaType === 'video') {
        if (!remoteUsers.value.find(u => u.uid === user.uid)) remoteUsers.value.push(user);

        setTimeout(() => {
          const el = document.getElementById(`remote-player-${user.uid}`);
          if (el && user.videoTrack) user.videoTrack.play(el.id);
        }, 200);
      }

      if (mediaType === 'audio') user.audioTrack?.play();
    });

    client.on('user-unpublished', user => {
      remoteUsers.value = remoteUsers.value.filter(u => u.uid !== user.uid);
    });

    await client.join(agoraToken.appId, meetingId, agoraToken.token, agoraToken.uid);

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

  const leaveCall = async (emitClose = true) => {
    if (isLeaving.value) return;
    isLeaving.value = true;

    try {
      localTracks.value?.videoTrack.close();
      localTracks.value?.audioTrack.close();
      await client.leave();
      if (emitClose) onClose();
    } catch (error) {
      console.error('Failed to leave call:', error);
    } finally {
      isLeaving.value = false;
    }
  };

  return {
    remoteUsers,
    isMicOn,
    isVideoOn,
    getRemoteUserLabel,
    initCall,
    toggleMic,
    toggleVideo,
    leaveCall,
  };
}
