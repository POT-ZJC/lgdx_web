<template>
  <div class="ControlCurtain">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="main-box">
        <div class="main-box-search">
          <p class="title">学号</p>
          <el-input
            v-model.trim="tableQuery.personNo"
            placeholder="学号"
            style="width: 160px"
          />
          <p class="title">电话</p>
          <el-input
            v-model.number="tableQuery.personTel"
            placeholder="电话"
            style="width: 160px"
          />
          <p class="title">姓名</p>
          <el-input
            v-model.trim="tableQuery.personName"
            placeholder="姓名"
            style="width: 160px"
          />
          <a class="btn" @click="reqTable()">搜索</a>
        </div>
      </div>

      <div class="main-box">
        <div style="margin-bottom: 15px">
          <a class="btn" @click="goEdituser()" style="width: 80px">新增人员</a>
        </div>
        <el-table class="main-box-table" :data="tableData" stripe>
          <el-table-column prop="order" label="序号" align="center" width="60">
          </el-table-column>
          <el-table-column prop="personName" label="姓名" align="center" />
          <el-table-column prop="userName" label="用户名" align="center">
          </el-table-column>
          <el-table-column prop="pin" label="卡号" align="center">
          </el-table-column>
          <el-table-column prop="personNo" label="学号" align="center" />
          <el-table-column
            prop="colleg"
            label="学院"
            align="center"
            show-overflow-tooltip
            width="160"
          />
          <el-table-column
            prop="personGrade"
            label="年级"
            align="center"
            show-overflow-tooltip
            width="160"
          />
          <el-table-column
            prop="startAndEnd"
            label="起止日期"
            align="center"
            show-overflow-tooltip
            width="160"
          />
          <el-table-column prop="typeName" label="类型" align="center" />
          <el-table-column prop="personTel" label="联系方式" align="center" />
          <el-table-column
            prop="personTel"
            label="操作"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <div style="display: flex;padding-top: 3px;">
                <a class="btn" @click="goEdituser(scope.row.personId)">编辑</a>
                <a class="btn" @click="reqRemoveUser(scope.row)">删除</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="main-box-pagination">
          <el-pagination
            background
            @current-change="reqTable"
            :current-page.sync="currentPage"
            :page-size="size"
            layout="total, prev, pager, next, jumper"
            :total="total"
          />
          <a class="btn">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableQuery: {
        personName: "", //姓名
        personNo: "", //学号
        personTel: "", //电话
      },
      currentPage: 1,
      size: 10,
      total: 0,
      abnormalSum: 0,
      tableData: [],
    };
  },
  created() {
    this.reqTable();
  },
  methods: {
    goEdituser(personId) {
      this.$router.push("/userManage/userEdit?personId=" + (personId || ""));
    },
    // 人员列表
    async reqTable(page) {
      this.currentPage = page || 1;
      const res = await this.$http("/api/person/queryPubPersonByPage", {
        ...this.tableQuery,
        pageCurrent: this.currentPage,
        pageRows: this.size,
      });
      const { rows, total } = res.data;
      this.total = total;
      this.tableData = rows.map((val, index) => {
        const order = index + this.currentPage * this.size - this.size + 1;
        return {
          order,
          startAndEnd: val.starDate + " - " + val.endDate,
          typeName: val.personType === "1" ? "学生" : "职工",
          ...val,
        };
      });
    },
    //人员删除
    reqRemoveUser(data) {
      this.$confirm(`确认删除:${data.personName}?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http("/api/person/deletePubPerson", {
          personId: data.personId || "",
        });
        if (res.resultCode === "200") {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ControlCurtain {
  color: #272a39;
  font-size: 18px;
  line-height: 24px;
}
/deep/ .cell {
  display: block !important;
}
.main-box-search {
  display: flex;
  align-items: center;
  .title {
    font-size: 14px;
    line-height: 20px;
    margin-right: 10px;
    &:not(:first-of-type) {
      margin-left: 20px;
    }
  }
  .btn {
    display: block;
    width: 50px;
    height: 28px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 28px;
    border-radius: 6px;
    margin-left: 20px;
    background-color: #42c9a8;
    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
  }
}
.main-box {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  &:not(:first-of-type) {
    margin-top: 20px;
  }
}
.main-box-title {
  line-height: 24px;
  font-weight: 700;
}
.main-box-list {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .item {
    display: flex;
    align-items: center;
    margin-right: 40px;
  }
  .item-key {
    font-weight: 700;
    margin-right: 10px;
  }
  .item-val {
    display: flex;
    align-items: flex-end;
  }

  .item-val-num {
    font-size: 44px;
    line-height: 59px;
    font-weight: 700;
  }
  .item-val-unit {
    line-height: 46px;
  }
  .item-val-state {
    font-weight: 700;
    &:not(:first-of-type) {
      margin-left: 15px;
    }
  }
  .green {
    color: #42c9a8;
  }
  .red {
    color: #ff2a2a;
  }
}

.main-box-table {
  width: 100%;
  .warning {
    color: #ff712a !important;
    font-weight: 700 !important;
  }
}
.main-box-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.btn {
  display: block;
  width: 50px;
  height: 28px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 28px;
  border-radius: 6px;
  margin-left: 10px;
  background-color: #42c9a8;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
}
</style>