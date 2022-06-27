<template>
  <ul>
    <!-- v-for 활용으로 반복된 데이터(리스트 등) 세팅 v-for활용  -->
    <!--리스트 렌더링 가이드문서 https://kr.vuejs.org/v2/guide/list.html -->
    <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">

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
  data: function () {
    return {
      todoItems: [],
    };
  },

  // 컴포넌트 내에서 쓰일 메소드들에 대한 정의는 methods 안에 구현한다.
  methods: {
    removeTodo: function (todoItem, index) {
      console.log("remove item   " + index + '  ' + todoItem.item);

      //로컬스토리지에 있는 데이터 삭제 (key)
      localStorage.removeItem(todoItem.item);

      //splice로 특정 인덱스요소 하나를 지운다.화면상에 todoItems가 바인딩되어있기에 화면에도 삭제된 요소 적용된다.
      this.todoItems.splice(index, 1);
    },

    // eslint-disable-next-line no-unused-vars
    toggleComplete: function (todoItem, index) {

      // console.log("toggle item 호출전  " + index + "  " + todoItem.completed + '  ' + todoItem.item);

      //화면상에 반영시키는 로직 (todoItem이 바인딩되어있는 상태)
      todoItem.completed = !todoItem.completed;

      //localStroage는 update메소드가 없어서 지우고 변경된 요소를 다시 추가해줘야한다.;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));

    },
  },

  //created는 인스턴스가 생성되자마자 호출되는 hook(라이프사이클 요소)
  //컴포넌트 초기값 설정 등에 활용
  //실제로 axios 연동하면
  created: function () {
    //로컬스토리지에 데이터가 있다면 for 문 실행
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {

        //localStorage의 ket로 value를 가져온다. (value는 completed와 item으로 구성된 obj)
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

      }
    }
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