import { VideoFullscreenUpdate } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

const unlockRotation = async ({ fullscreenUpdate }: any) => {
	// if the video finished switching from normal to fullscreen we unlocck the rotation
	if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
		await ScreenOrientation.unlockAsync()
	}
	// else if the video finished switching back to normal we lock the screen in portrait
	else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
		await ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.PORTRAIT
		)
	}
}

export default unlockRotation
