let Core = {};

let player = {
  next: undefined,
  previous: undefined,
  playPause: undefined,
  inited: false
};

let unityUtils = {
  init: function(options) {
    try {
      options.wrappedJSObject.onInit();
    } catch (e) {
      unsafeWindow.console.log(e);
    }
    player.inited = true;
  },
  onNext: function(clb) {
    player.next = clb;
  },
  onPrevious: function(clb) {
    player.previous = clb;
  },
  onPlayPause: function(clb) {
    player.playPause = clb;
  },
  noop: function() {}
};

let getUnityObject = function() {
  return unsafeWindow.external.unityUtils;
};

var extUnityUtils = createObjectIn(unsafeWindow.external, {defineAs: "unityUtils"});
var mediaPlayer = createObjectIn(unsafeWindow.external.unityUtils, {defineAs: "MediaPlayer"});
createObjectIn(mediaPlayer, {defineAs: "PlaybackState"});

exportFunction(unityUtils.onNext, mediaPlayer, {defineAs: "onNext"});
exportFunction(unityUtils.onPrevious, mediaPlayer, {defineAs: "onPrevious"});
exportFunction(unityUtils.onPlayPause, mediaPlayer, {defineAs: "onPlayPause"});
exportFunction(unityUtils.noop, mediaPlayer, {defineAs: "setTrack"});
exportFunction(unityUtils.noop, mediaPlayer, {defineAs: "setCanPlay"});
exportFunction(unityUtils.noop, mediaPlayer, {defineAs: "setCanPause"});
exportFunction(unityUtils.noop, mediaPlayer, {defineAs: "setPlaybackState"});
exportFunction(unityUtils.init, extUnityUtils, {defineAs: "init", allowCrossOriginArguments: true});

exportFunction(getUnityObject, unsafeWindow.external, {defineAs: "getUnityObject"});

self.port.on("togglePlayback", function () {
  player.inited && player.playPause();
});

self.port.on("playNext", function () {
  player.inited && player.next();
});

self.port.on("playPrevious", function () {
  player.inited && player.previous();
});
