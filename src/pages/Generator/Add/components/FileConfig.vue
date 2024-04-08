<template>
  <a-alert
      message="如果不需要在线制作功能,可不填写"
      type="warning"
      closable
      w-833px
      mx-auto
      mb
  />
  <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="formState.fileConfig!.files"
  >
    <a-space
        v-for="(item , cardIndex) in formState.fileConfig!.files"
        :key="item.groupKey"
        style="display: flex; margin-bottom: 8px"
        align="baseline"
        justify-center
    >
      <a-card :title="item.groupKey ? '分组' : '未分组字段' " w-833px>
        <template #extra><CloseOutlined @click="removeCard(item)" /></template>
        <div v-if="item.groupKey"  >
          <div flex mb items-center style="column-gap: 8px;row-gap: 8px;">
            <a-form-item has-feedback label="分组key" flex-col >
              <a-input v-model:value="item.groupKey"  autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="组名" flex-col>
              <a-input v-model:value="item.groupName" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="类型" flex-col>
              <a-input v-model:value="item.type" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="条件" flex-col>
              <a-input v-model:value="item.condition" autocomplete="off" />
            </a-form-item>
          </div>
          <div>
            <div style="margin-bottom: 8px" flex>组内字段</div>
            <a-space
                v-for="(field , fieldIndex) in item.files"
                :key="field.groupKey"
                style="display: flex; margin-bottom: 8px"
                align="baseline"
            >
              <a-form-item has-feedback label="输入路径" flex-col>
                <a-input v-model:value="field.inputPath"  autocomplete="off" />
              </a-form-item>
              <a-form-item has-feedback label="输出路径" flex-col>
                <a-input v-model:value="field.outputPath" autocomplete="off" />
              </a-form-item>
              <a-form-item has-feedback label="类型" flex-col>
                <a-select
                    v-model:value="field.type"
                    label-in-value
                    style="min-width: 80px"
                    :options="options"
                ></a-select>
              </a-form-item>
              <a-form-item has-feedback label="生成类型" flex-col>
                <a-select
                    v-model:value="field.generateType"
                    label-in-value
                    style="min-width: 80px"
                    :options="options"
                ></a-select>
              </a-form-item>
              <a-form-item has-feedback label="条件" flex-col>
                <a-input v-model:value="field.condition" autocomplete="off" />
              </a-form-item>
              <div flex flex-col-reverse h-57px>
                <a-button danger type="text" @click="removeField(cardIndex, fieldIndex)" mt-10px>
                  <span>删除</span>
                </a-button>
                <div></div>
              </div>
            </a-space>
            <a-button type="dashed" block @click="addField(cardIndex)">
              <PlusOutlined />
              添加组内字段
            </a-button>
          </div>
        </div>

        <div v-else flex mb items-center inline-flex style="column-gap: 8px;row-gap: 8px;">
          <a-form-item has-feedback label="输入路径" flex-col>
            <a-input v-model:value="item.inputPath"  autocomplete="off" />
          </a-form-item>
          <a-form-item has-feedback label="输出路径" flex-col>
            <a-input v-model:value="item.outputPath" autocomplete="off" />
          </a-form-item>
          <a-form-item has-feedback label="类型" flex-col>
            <a-select
                v-model:value="item.type"
                label-in-value
                style="min-width: 96px"
                :options="options"
            ></a-select>
          </a-form-item>
          <a-form-item has-feedback label="生成类型" flex-col>
            <a-select
                v-model:value="item.generateType"
                label-in-value
                style="min-width: 96px"
                :options="options"
            ></a-select>
          </a-form-item>
          <a-form-item has-feedback label="条件" flex-col>
            <a-input v-model:value="item.condition" autocomplete="off" />
          </a-form-item>
        </div>
      </a-card>
    </a-space>

    <a-form-item w-420px mx-auto>
      <a-button type="dashed" block @click="addCard('field')" mb>
        <PlusOutlined />
        添加字段
      </a-button>
      <a-button type="dashed" block @click="addCard('group')">
        <PlusOutlined />
        添加分组
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import GeneratorAddRequest = Api.GeneratorAddRequest;
import GeneratorEditRequest = Api.GeneratorEditRequest;
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import {FormInstance, SelectProps} from "ant-design-vue";
import ModelInfo = Api.ModelInfo;
import {ref} from "vue";

const props = defineProps<{
  formState: GeneratorAddRequest
  oldData: GeneratorEditRequest
}>()
const formStateProps = props.formState
const oldData = ref(props.oldData)
const formState = reactive<GeneratorAddRequest>(formStateProps)
console.log(formState)


// 表单ref
const formRef = ref<FormInstance>();
formState.fileConfig!.files=[]

const options = ref<SelectProps['options']>([
  {
    value: 'jack',
    label: 'Jack (100)',
  },
  {
    value: 'lucy',
    label: 'Lucy (101)',
  },
]);

// 组内添加字段
const addField = (cardIndex: number) => {
  if(typeof formState.fileConfig!.files![cardIndex].files == 'undefined'){
    formState.fileConfig!.files![cardIndex].files = [{}]
  }else {
    formState.fileConfig!.files![cardIndex].files?.push({})
  }
}
// 组内删除字段
const removeField = (cardIndex: number, fieldIndex: number) => {
  formState.fileConfig!.files![cardIndex].files?.splice(fieldIndex, 1);
}

// 添加卡片
const addCard = (addType: "field" | "group") => {
  switch (addType) {
    case "field":
      formState.fileConfig!.files!.push({})
      break
    case "group":
      formState.fileConfig!.files!.push({ groupKey: "groupKey" , groupName: "分组"})
      break
  }
}

// 删除卡片
const removeCard = (item: ModelInfo) => {
  const index = formState.fileConfig!.files!.indexOf(item);
  if (index !== -1) {
    formState.fileConfig!.files!.splice(index, 1);
  }
};

// const onFinish = values => {
//   console.log('Received values of form:', values);
//   console.log('formData:', formState.modelConfig!.models!);
// };

</script>

<style scoped lang="less">
:deep(.ant-form-item-label){
  display: flex;
}
</style>