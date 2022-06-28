<!-- Header 컴포넌트는 별다른 기능없는 UI 컴포넌트 -->
<template>
  <header>
    <h1>{{ this.$store.state.headerText }}</h1>
  </header>
</template>

<script>
// TodoHeader 컴포넌트에서는 스크립트 쓰지 않을 예정이라 <script>태그 자체 삭제해도 무관
export default {};
</script>

<style scoped>
h1 {
  color: #2f3b52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}
</style>