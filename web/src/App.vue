<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { postRequest } from "./utils/functions";
import Icon from "@jamescoyle/vue-icon";
import { mdiCheck, mdiInformation, mdiAlert, mdiAlertCircle } from "@mdi/js";

interface Notify {
  id: number;
  title: string;
  text: string;
  duration: number;
  show?: boolean;
  type: keyof typeof types;
  progress?: number;
  initialDuration?: number;
}

const activeNotify = ref<Notify[]>([]);
let notifyId = 0;

const types = {
  ["success"]: {
    ["icon"]: mdiCheck,
    ["color"]: "#19FF70",
  },
  ["info"]: {
    ["icon"]: mdiInformation,
    ["color"]: "#19B9FF",
  },
  ["warning"]: {
    ["icon"]: mdiAlert,
    ["color"]: "#FFC019",
  },
  ["error"]: {
    ["icon"]: mdiAlertCircle,
    ["color"]: "#FF3A3A",
  },
};

function convertMessage(text: string) {
    text = text.replace(/~r~/g, "<span style='color:#ef5350';>");
    text = text.replace(/~g~/g, "<span style='color:#4caf50';>");
    text = text.replace(/~lg~/g, "<span style='color:#81c784';>");
    text = text.replace(/~lr~/g, "<span style='color:#e57373';>");
    text = text.replace(/~p~/g, "<span style='color:#7e57c2';>");
    text = text.replace(/~lp~/g, "<span style='color:#9575cd';>");
    text = text.replace(/~o~/g, "<span style='color:#ff9800';>");
    text = text.replace(/~lo~/g, "<span style='color:#ffb74d';>");
    text = text.replace(/~y~/g, "<span style='color:#FFDD32';>");
    text = text.replace(/~s~/g, "</span>");
    text = text.replace(/~w~/g, "</span>");
    text = text.replace(/~b~/g, "<b>");
    text = text.replace(/~n~/g, "<br>");
    text = "<span style='color:#eee';>" + text + "</span>";
        
    return text
}

function CreateNotify(data: Omit<Notify, "id">): void {
  if(!types[data.type]){
    data.type = 'info'
  }
  
  const id = notifyId++;
  activeNotify.value.push({
    id,
    title: data.title || "Notification",
    text: data.text || "This is a notification",
    duration: data.duration || 5000,
    type: data.type || "info",
  });

  if (activeNotify.value.length > 1) return;

  const interval = setInterval(() => {
    if (activeNotify.value.length == 0) {
      return clearInterval(interval);
    }

    activeNotify.value.forEach((item: Notify) => {
      if (!item.progress) {
        item.progress = 0;
      }

      if (!item.show) {
        item.show = true;
      }

      if (!item.initialDuration) {
        item.initialDuration = item.duration;
      }

      if (item.duration < 0) {
        item.show = false;
      } else {
        item.duration = item.duration - 10;
        item.progress =
          ((item.initialDuration - item.duration) / item.initialDuration) *
            100 -
          1;
      }
    });
  }, 10);
}

function removeNotify(id: number) {
  activeNotify.value = activeNotify.value.filter((notify) => notify.id !== id);
}

function MessageHandler(e: MessageEvent) {
  switch (e.data.action) {
    case "CreateNotify":
      CreateNotify(e.data.data);
      break;
  }
}

onUnmounted(() => {
  window.removeEventListener("message", MessageHandler);
});

onMounted(() => {
  window.addEventListener("message", MessageHandler);
});
</script>

<template>
  <div>
    <div
      v-for="item in activeNotify"
      :key="item.id"
      class="flex flex-col items-end justify-end"
    >
      <Transition
        name="slide-fade"
        mode="in-out"
        @after-leave="removeNotify(item.id)"
      >
        <div v-if="item.show">
          <div class="p-2">
            <div class="bg-[rgba(29,31,33,0.9)] text-white w-[350px] relative">
              <div
                :style="`z-index: -9999; width: ${
                  item.progress || 0
                }%; background-color: ${types[item.type].color}`"
                class="absolute bottom-0 left-0 h-full"
              ></div>
              <div class="p-2">
                <div class="flex items-center gap-3">
                  <div>
                    <icon
                      :style="`color:${types[item.type].color}`"
                      class="size-8"
                      type="mdi"
                      :path="types[item.type].icon"
                    ></icon>
                  </div>
                  <div class="flex flex-col">
                    <span
                      :style="`color:${types[item.type].color}`"
                      class="font-bold text-base"
                      >{{ item.title }}</span
                    >
                    <span v-html="convertMessage(item.text )"></span>
                  </div>
                </div>
              </div>
              <div
                :style="`width: ${item.progress || 0}%; background-color: ${
                  types[item.type].color
                }`"
                class="bottom-0 h-1"
              ></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
::-webkit-scrollbar {
  display: none !important;
  width: 0px;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(300px);
  opacity: 0;
}
</style>
