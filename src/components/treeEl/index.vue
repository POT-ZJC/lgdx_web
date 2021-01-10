<template>
  <el-dialog
    title="选择实验室"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="7rem"
  >
    <div class="tree-box">
      <el-tree
        ref="treeEl"
        :highlight-current="true"
        @check-change="treeCheck"
        :data="treeData"
        :show-checkbox="true"
        node-key="placeInfoId"
        :props="{
          children: 'children',
          label: 'placeName',
          disabled: (data) => {
            if (!checkbox && data.children) {
              return true;
            }
            return false;
          },
        }"
      ></el-tree>
    </div>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="getTreeCheck">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { postQueryLaboratoryPlace } from "@/api";
import { Message } from "element-ui";
export default {
  props: {
    checkbox: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogVisible: true,
      treeData: [],

      checkData: null,
    };
  },
  mounted() {
    this.reqQueryLaboratoryPlace();
  },
  methods: {
    treeCheck(nodeData, has) { 
      if (has&&!this.checkbox) {
        this.$refs.treeEl.setCheckedKeys([nodeData.placeInfoId], true);
      }
    },
    //查询实验室-树形节点
    reqQueryLaboratoryPlace() {
      postQueryLaboratoryPlace().then((res) => {
        this.treeData = res.data || [];
      });
    },

    getTreeCheck() {
      const treeCheckList = this.$refs.treeEl.getCheckedNodes();
      if (treeCheckList.length) {
        this.$emit("treeClick", treeCheckList); 
        this.dialogVisible = false;
        return false;
      }

      Message({
        message: "请选择实验室！",
        type: "error",
        duration: 2 * 1000,
        // duration: 0,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-box {
  max-height: 7rem;
  overflow-y: auto;
}
/deep/ .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(98, 228, 182, 1);
}
</style>
<style   >
.el-message {
  font-size: 0.7rem;
}
</style>