<template>
111
</template>

<script setup lang="ts">
import GeneratorAddRequest = Api.GeneratorAddRequest;
import GeneratorEditRequest = Api.GeneratorEditRequest;

const props = defineProps<{
  formState: GeneratorAddRequest
  oldData: GeneratorEditRequest
}>()
const formStateProps = props.formState
const oldDataProps = props.oldData
const formState = reactive<GeneratorAddRequest>(formStateProps)
const oldData = reactive<GeneratorAddRequest>(oldDataProps)
</script>

<style scoped lang="less">

</style>