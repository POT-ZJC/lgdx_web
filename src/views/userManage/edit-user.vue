<template>
  <div class="edit-user">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/userManage/userList">人员列表</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{
        personId ? "编辑人员" : "新增人员"
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-layout">
      <h3 class="title">{{ personId ? "编辑人员信息" : "新增人员信息" }}</h3>
      <el-form ref="form" :model="form" label-width="100px" class="form-layout">
        <el-form-item
          label="用户名"
          prop="userName"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.trim="form.userName" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item
          label="姓名"
          prop="personName"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.trim="form.personName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item
          label="学号"
          prop="personNo"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.trim="form.personNo" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item
          label="卡号"
          prop="pin"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.trim="form.pin" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item
          label="身份证"
          prop="personCard"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.trim="form.personCard" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item
          label="类型"
          prop="personType"
          :rules="[{ required: true, message: '请选择' }]"
        >
          <el-radio-group v-model.trim="form.personType">
            <el-radio label="1">学生</el-radio>
            <el-radio label="2">职工</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="personTel"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.number="form.personTel" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item
          label="院系"
          prop="colleg"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.trim="form.colleg" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item
          label="年级"
          prop="personGrade"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <el-input v-model.trim="form.personGrade" maxlength="30"></el-input>
        </el-form-item>

        <el-form-item
          label="学历"
          prop="education"
          :rules="[{ required: true, message: '请选择' }]"
        >
          <el-select v-model.trim="form.education" placeholder="请选择">
            <el-option label="本科" value="0"></el-option>
            <el-option label="硕士" value="1"></el-option>
            <el-option label="博士" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="有效时间"
          prop="daterange"
          :rules="[{ required: true, type: 'array', message: '请选择' }]"
        >
          <el-date-picker
            v-model="form.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input
            type="textarea"
            v-model.trim="form.note"
            placeholder="请填写，限500字"
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.push('/userManage/userList')"
            >取消</el-button
          >
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        userName: "",
        personName: "",
        personNo: "",
        pin: "",
        personCard: "",
        personType: "",
        colleg: "",
        personGrade: "",
        education: "",
        daterange: [],
        note: "",
      },
    };
  },
  computed: {
    personId() {
      return this.$route.query.personId || "";
    },
  },
  created() {
    this.reqUserinfo();
  },
  methods: {
    reqUserinfo() {
        console.log(this.personId)
      if (this.personId) {
        this.$http("/api/person/queryPubPersonDetail", {
          personId: this.personId,
        }).then((res) => {
          this.form = {
            ...res.data,
            daterange: [res.data.starDate || "", res.data.endDate || ""],
          };
        });
      }
    },

    onSubmit() {
      console.log(this.form);

      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const formData = {
            ...this.form,
            personId: this.personId,
            starDate: moment(this.form.daterange[0]).format(
              "yyyy-MM-DD 00:00:00"
            ),
            endDate: moment(this.form.daterange[1]).format(
              "yyyy-MM-DD 00:00:00"
            ),
          };
          console.log(formData);

          let res = null;
          if (!this.personId) {
            res = await this.$http("/api/person/addPubPerson", formData);
          } else {
            res = await this.$http("/api/person/updatePubPerson", formData);
          }
          if (res) {
            this.$message.success("操作成功");
            this.$router.push("/userManage/userList");
          } else {
            this.$message.success("操作失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-user {
  .main-layout {
    padding: 20px 0;
    border-radius: 10px;
    background: #fff;
    .title {
      margin-left: 20px;
      color: #42c9a8;
    }
  }
  .form-layout {
    margin-left: 150px;
    // margin: 0 auto;
    width: 400px;
  }
}
</style>