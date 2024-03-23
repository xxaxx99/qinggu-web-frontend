<template>
  <div style="margin-top: 16px">
    <a-card-meta :title="basicInfo.userName" :description="basicInfo.userProfile">
      <template #avatar>
        <a-avatar v-if="basicInfo.userAvatar" :size="64" :src="basicInfo.userAvatar"/>
        <a-avatar v-else :size="64" src="https://partner-bucket-xx.oss-cn-beijing.aliyuncs.com/0152b8d0-3136-43f9-bf03-027f060064c6.png"/>
      </template>
    </a-card-meta>
  </div>
</template>

<script setup lang="ts">
import UserVO = Api.UserVO;

interface BasicInfoProps {
  data: Api.GeneratorVO
}
const basicInfoProps = defineProps<BasicInfoProps>()
const basicInfo: UserVO = basicInfoProps.data
</script>

<style scoped lang="less">

</style>