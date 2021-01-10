<template>
  <div class="userInfo">
    <div class="userInfo-img"><img  src='/images/icon-用户.svg' alt="" /></div>
    <div class="userInfo-desc">
      <div class="desc-item">负责人姓名：XXX</div>
      <div class="desc-item">联系方式：XXX</div>
      <div class="desc-item">负责实验室：XXX</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.userInfo {
  height: 100%;

  .user-head {
    width: 1rem;
    height: 1rem;
    background: #ffffff;
    border: 1px solid #707070;
    border-radius: 50%;
    margin-right: 0.12rem;
  }
  .userInfo-desc{

    .desc-item{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    
  }
}
</style>