<template>
  <div class="wechatplayer-wraper" :style="styleObject">
    <div class="wechatplayer-box">
      <div class="player-icon" v-if="!playing" @click="handlePlay"></div>
      <div class="playing-icon" v-else @click="handlePlay">
        <span class="is-play"></span>
      </div>
      <div class="player-info">
        <p class="player-name" v-text="title"></p>
        <div class="progress-praent" @click.stop="progressClick($event)">
          <div class="player-progress" ref="barRef">
            <div class="progress" ref="progressRef" :style="{width:prCurrentTime+'%'}"></div>
            <div class="circle" :style="{left:prCurrentTime+'%'}" @touchstart.stop.prevent="dragStart($event)" @touchmove.stop.prevent="dragmove($event)" @touchend.stop.prevent="dragEnd($event)">
              <span class="circle-center"></span>
            </div>
          </div>
        </div>

        <div class="progress-time">
          <span class="start_time">{{currentTime|time}}</span>
          <span class="end_time">{{duration|time}}</span>
        </div>
      </div>
    </div>
    <audio :src="url" :id="playerid" controls :autoplay="autoplay" @timeupdate="updateTime" @canplay="canPlay" @error="loadError" preload="preload" @ended="ended"></audio>
  </div>
</template>
<script>
export default {
  name: "webchatPlayer",
  props: {
    playerid: {
      type: String,
      default: "audio-player"
    },
    url: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: false
    },

    styleObject: {
      type: Object,
      default: () => {
        return {
          width: "289px",
          height: "71px"
        };
      }
    }
  },
  data() {
    return {
      player: null,
      duration: 0,
      currentTime: 0,
      prCurrentTime: 0,
      playing: false,
      leave: 0,
      oDiv1: 0,
      oDiv2: null,
      oDiv3: null
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initPlyer();
      this.boxWidth = this.$refs.barRef.offsetWidth;
      this.oDiv2 = document.querySelector(".progress");
      this.oDiv3 = document.querySelector(".circle");
    });
  },
  methods: {
    initPlyer() {
      this.player = document.getElementById(this.playerid);
    },
    handlePlay() {
      //播放操作
      this.playPause();
    },
    hanldePause() {
      //暂停
      this.playPause();
    },
    playPause() {
      if (this.player.paused) {
        this.player.play();
        this.$emit("paly");
        this.playing = true;
      } else {
        this.player.pause();
        this.$emit("pause");
        this.playing = false;
      }
    },
    updateTime() {
      //播放器返回的时间
      this.currentTime = this.player.currentTime;
      this.prCurrentTime = this.currentTime / this.duration * 100;
      this.$emit("currentTime", this.currentTime);
    },
    canPlay() {
      //可以播放
      this.duration = this.player.duration;
      this.$emit("canplay");
    },
    loadError() {
      this.$emit("error"); //抛出加载失败
    },
    ended() {
      this.$emit("ended"); //播放完毕
      this.playing = false;
    },
    dragStart(e) {
      //手指触发时
      let x = e.targetTouches[0].clientX - this.oDiv3.offsetLeft;
      this.leave = x;
    },
    dragmove(e) {
      //手指在屏幕移动时
      let x = e.targetTouches[0].clientX - this.leave;
      if (x >= this.boxWidth) {
        x = this.boxWidth;
      } else if (x <= 0) {
        x = 0;
      }
      this.oDiv3.style.left = x + "px";
      this.oDiv2.style.width = x + "px";
    },
    dragEnd(e) {
      //离开时
      let newX = e.changedTouches[0].clientX;
      let oDiv2W = this.oDiv2.offsetWidth;
      let oDuration = oDiv2W / this.boxWidth;
      let currentTime = oDuration * this.duration;
      this.player.currentTime = parseInt(oDuration * this.duration);
    },
    progressClick(e) {
      // 返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
      let rectLeft = this.$refs.barRef.getBoundingClientRect().left;
      let offsetWidth = e.pageX - rectLeft;
      let newPercent = offsetWidth / this.boxWidth;
      let currentTime = this.duration * newPercent;
      this.player.currentTime = parseInt(currentTime);
    }
  },
  filters: {
    // 时间字符格式化
    time(result) {
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      if (h == "00") {
        return `${m}:${s}`;
      } else {
        return `${h}:${m}:${s}`;
      }
    }
  }
};
</script>
<style lang="scss">
$box-bg: #f8f8f8;
@mixin bg-logo-x($w, $h, $url) {
  width: $w;
  height: $h;
  background-size: $w $h;
  background-image: url($url+"@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url($url+"@3x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3.375),
    (min-device-pixel-ratio: 3.375) {
    background-image: url($url+"@3x.png");
  }
  background-repeat: no-repeat;
}
.wechatplayer-wraper {
  background: $box-bg;
  box-sizing: border-box;
  padding: 0 18px;
  border-radius: 4px;
  border: 1px solid rgba(230, 230, 230, 1);
  audio {
    display: none;
  }
  .wechatplayer-box {
    display: flex;
    align-items: center;
    height: 100%;
    .player-icon {
      display: inline-block;
      @include bg-logo-x(30px, 30px, "../assets/img/voice");
      flex: 0 0 30px;
      margin-right: 10px;
    }
    .playing-icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border: 2px solid #1aad19;
      border-radius: 100%;
      text-align: center;
      line-height: 20px;
      box-sizing: border-box;
      .is-play {
        background: transparent url("../assets/img/playing.png") no-repeat 0 0;
        width: 18px;
        height: 25px;
        vertical-align: middle;
        display: inline-block;
        background-size: 47px 25px;
        -webkit-animation: audio_playing 1s infinite;
        background-position: 0px center;
        margin-left: 8px;
      }
    }
    .player-info {
      flex: 1;
      min-width: 0;
      .player-name {
        color: #626262;
        font-size: 13px;
        margin: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
      }
    }
    .progress-praent {
      margin-top: 2px;
      padding-top: 4px;
      padding-bottom: 7px;
      margin-bottom: 2px;
      box-sizing: border-box;
      .player-progress {
        height: 2px;
        position: relative;
        background: #ebebeb;
        .progress {
          position: absolute;
          height: 3px;
          z-index: 33px;
          background: #09bb07;
        }
        .circle {
          position: absolute;
          top: 50%;
          margin-top: -7px;
          width: 15px;
          height: 15px;
          background: rgba(217, 243, 216, 1);
          box-sizing: border-box;
          border-radius: 50%;
          padding: 3px;
          .circle-center {
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0; 
            right: 0;
            bottom: 0;
            margin: auto;
            background: #09bb07;
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }
        }
      }
    }

    .progress-time {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #999999;
    }
  }
  @-webkit-keyframes audio_playing {
    30% {
      background-position: 0px center;
    }
    31% {
      background-position: -18px center;
    }
    61% {
      background-position: -18px center;
    }
    61.5% {
      background-position: -36px center;
    }
    100% {
      background-position: -36px center;
    }
  }
}
</style>

