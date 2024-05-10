<template>
  <template v-if="!props.oldData.name">
    <a-form
        ref="formRef"
        name="dynamic_form_nest_item"
        :model="formState.modelConfig!.models"
    >
      <a-space
          v-for="(item , cardIndex) in formState.modelConfig!.models"
          :key="item.groupKey"
          style="display: flex; margin-bottom: 8px"
          align="baseline"
          justify-center
      >
        <a-card :title="item.groupKey ? '分组' : '未分组字段' " w-973px>
          <template #extra><CloseOutlined @click="removeCard(item)" /></template>
          <div v-if="item.groupKey" >
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
                  v-for="(field , fieldIndex) in item.models"
                  :key="field.groupKey"
                  style="display: flex; margin-bottom: 8px"
                  align="baseline"
              >
                <a-form-item has-feedback label="字段名称" flex-col>
                  <a-input v-model:value="field.fieldName"  autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="描述" flex-col>
                  <a-input v-model:value="field.description" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="类型" flex-col>
                  <a-input v-model:value="field.type" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="默认值" flex-col>
                  <a-input v-model:value="field.defaultValue" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="缩写" flex-col>
                  <a-input v-model:value="field.abbr" autocomplete="off" />
                </a-form-item>
                <div flex flex-col-reverse h-57px>
                  <a-button danger type="text" @click="removeField1(cardIndex, fieldIndex)" mt-10px>
                    <span>删除</span>
                  </a-button>
                  <div></div>
                </div>


              </a-space>
              <a-button type="dashed" block @click="addField1(cardIndex)" mt>
                <PlusOutlined />
                添加组内字段
              </a-button>
            </div>
          </div>

          <div v-else flex mb items-center inline-flex style="column-gap: 8px;row-gap: 8px;">
            <a-form-item has-feedback label="字段名称" flex-col>
              <a-input v-model:value="item.fieldName"  autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="描述" flex-col>
              <a-input v-model:value="item.description" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="类型" flex-col>
              <a-input v-model:value="item.type" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="默认值" flex-col>
              <a-input v-model:value="item.defaultValue" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="缩写" flex-col>
              <a-input v-model:value="item.abbr" autocomplete="off" />
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
  <template v-else>
    <a-form
        ref="formRef"
        name="dynamic_form_nest_item"
        :model="oldData.modelConfig!.models"
    >
      <a-space
          v-for="(item , cardIndex) in oldData.modelConfig!.models"
          :key="item.groupKey"
          style="display: flex; margin-bottom: 8px"
          align="baseline"
          justify-center
      >
        <a-card :title="item.groupKey ? '分组' : '未分组字段' " w-973px>
          <template #extra><CloseOutlined @click="removeCard(item)" /></template>
          <div v-if="item.groupKey" >
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
                  v-for="(field , fieldIndex) in item.models"
                  :key="field.groupKey"
                  style="display: flex; margin-bottom: 8px"
                  align="baseline"
              >
                <a-form-item has-feedback label="字段名称" flex-col>
                  <a-input v-model:value="field.fieldName"  autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="描述" flex-col>
                  <a-input v-model:value="field.description" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="类型" flex-col>
                  <a-input v-model:value="field.type" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="默认值" flex-col>
                  <a-input v-model:value="field.defaultValue" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="缩写" flex-col>
                  <a-input v-model:value="field.abbr" autocomplete="off" />
                </a-form-item>
                <div flex flex-col-reverse h-57px>
                  <a-button danger type="text" @click="removeField2(cardIndex, fieldIndex)" mt-10px>
                    <span>删除</span>
                  </a-button>
                  <div></div>
                </div>


              </a-space>
              <a-button type="dashed" block @click="addField2(cardIndex)" mt>
                <PlusOutlined />
                添加组内字段
              </a-button>
            </div>
          </div>

          <div v-else flex mb items-center inline-flex style="column-gap: 8px;row-gap: 8px;">
            <a-form-item has-feedback label="字段名称" flex-col>
              <a-input v-model:value="item.fieldName"  autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="描述" flex-col>
              <a-input v-model:value="item.description" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="类型" flex-col>
              <a-input v-model:value="item.type" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="默认值" flex-col>
              <a-input v-model:value="item.defaultValue" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="缩写" flex-col>
              <a-input v-model:value="item.abbr" autocomplete="off" />
            </a-form-item>
          </div>
        </a-card>
      </a-space>

      <a-form-item w-420px mx-auto mt>
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
</template>

<script setup lang="ts">
import GeneratorAddRequest = Api.GeneratorAddRequest;
import GeneratorEditRequest = Api.GeneratorEditRequest;
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { FormInstance } from "ant-design-vue";
import ModelInfo = Api.ModelInfo;
import {ref} from "vue";

const props = defineProps<{
  formState: GeneratorAddRequest
  oldData: GeneratorEditRequest
}>()
const formStateProps = props.formState
const oldData = ref(props.oldData)
const formState = reactive<GeneratorAddRequest>(formStateProps)

const temp = () => {
  oldData.value = props.oldData
}
setTimeout(() => { temp() }, 500)


// 表单ref
const formRef = ref<FormInstance>();
formState.modelConfig!.models=[]

// 组内添加字段
const addField1 = (cardIndex: number) => {
  if(typeof formState.modelConfig!.models![cardIndex].models == 'undefined'){
    formState.modelConfig!.models![cardIndex].models = [{}]
  }else {
    formState.modelConfig!.models![cardIndex].models?.push({})
  }
}

const addField2 = (cardIndex: number) => {
  if(typeof oldData.value.modelConfig!.models![cardIndex].models == 'undefined'){
    oldData.value.modelConfig!.models![cardIndex].models = [{}]
  }else {
    oldData.value.modelConfig!.models![cardIndex].models?.push({})
  }
}
// 组内删除字段
const removeField1 = (cardIndex: number, fieldIndex: number) => {
  formState.modelConfig!.models![cardIndex].models?.splice(fieldIndex, 1);
}

const removeField2 = (cardIndex: number, fieldIndex: number) => {
  oldData.value.modelConfig!.models![cardIndex].models?.splice(fieldIndex, 1);
}

// 添加卡片
const addCard = (addType: "field" | "group") => {
  switch (addType) {
    case "field":
      formState.modelConfig!.models!.push({})
      oldData.value.modelConfig!.models!.push({})
          break
    case "group":
      formState.modelConfig!.models!.push({ groupKey: "groupKey" , groupName: "分组"})
      oldData.value.modelConfig!.models!.push({ groupKey: "groupKey" , groupName: "分组"})
          break
  }
}

// 删除卡片
const removeCard = (item: ModelInfo) => {
  const index1 = formState.modelConfig!.models!.indexOf(item);
  const index2 = oldData.value.modelConfig!.models!.indexOf(item);
  if (index1 !== -1) {
    formState.modelConfig!.models!.splice(index1, 1);
  }
  if (index2 !== -1) {
    oldData.value.modelConfig!.models!.splice(index2, 1);
  }
};

</script>

<style scoped lang="less">
:deep(.ant-form-item-label){
  display: flex;
}
</style>