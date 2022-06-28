<template>
  <ul>
    <!-- v-for 활용으로 반복된 데이터(리스트 등) 세팅 v-for활용  -->
    <!--리스트 렌더링 가이드문서 https://kr.vuejs.org/v2/guide/list.html -->
    <!-- store에 저장되어있는 todoItems 값으로 출력 -->
    <li v-for="(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">

      <!-- 완료한 List에대한 체크처리버튼 -->
      <i class="checkBtn fas fa-check" v-bind:class="{ checkBtnCompleted: todoItem.completed }"
        v-on:click="toggleComplete(todoItem, index)"></i>

      <!-- todoItem 데이터 출력 바인딩 {{ }}형태로 바로 접근 가능 -->
      <!-- v-bind:class로 complted여부에 따른 스타일 적용예시-->
      <span v-bind:class="{ textCompleted: todoItem.completed }"> {{ todoItem.item }}</span>


      <!-- v-on:click는 클릭이벤트를 받고 실행될 메소드(removeTodo)를 등록해준다.-->
      <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
        <i class="fa-solid fa-trash"></i>
      </span>
    </li>
  </ul>
</template>


<script>
export default {

  //vuex 사용으로 propsdata 필요가 없어진다.
  //props: ['propsdata'],


  data: function () {
    return {
      todoItems: [],
    };
  },

  // 컴포넌트 내에서 쓰일 메소드들에 대한 정의는 methods 안에 구현한다.
  methods: {


    removeTodo: function (todoItem, index) {


      //removeTodo 메소드 는 스토어에 있는 removeOneTodo mutations을 호출한다.
      this.$store.commit('removeOneTodo', { todoItem, index });

    },

    // eslint-disable-next-line no-unused-vars
    toggleComplete: function (todoItem, index) {


      this.$store.commit('toggleOneComplete', { todoItem, index });


    },
  },


};
</script>
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>