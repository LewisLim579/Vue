<!-- template -> HTML코드 -->
<template>
  <div id="app">

    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:하위컴포넌트에서 발생시킨 이벤트명="현재컴포넌트에서 실행시킬 메소드"></TodoInput> -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- <TodoList v-bind: 자식으로(리스트로)내려보낼 프롭스 속성 이름 = ""></TodoList> -->
    <TodoList v-bind:propsdata="todoItems" v-on:removeTodoItem="removeOneTodo" v-on:toggleTodoItem="toggleOneComplete">
    </TodoList>
    <TodoFooter v-on:clearAllTodoItem="clearAllItem"></TodoFooter>
  </div>
</template>
<script>
//화면에서 쓰일 컴포넌트들 import
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  components: {
    //화면에서 쓰일 컴포넌트들 등록
    //컴포넌트 태그명 : 컴포넌트 내용
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
  },

  methods: {
    addOneItem: function (todoItem) {
      //아이템 객체는 해당 리스트 item과 완료 여부에 대한 completed라는 속성으로 구성된다.
      const obj = {
        //생성될때 완료여부 초기값은 false
        completed: false,
        item: todoItem,
      }

      //this.newTodoItem은 위 data에서 선언한 newTodoItem을 의미
      console.log(todoItem);

      //Brower 로컬스토리지에 저장 localStorage.setItem(key, value) 형태, 개발자도구에서 확인 가능
      //JSON.stringfy 활용으로 객체를 String형태로 집어넣을 수 있다.
      localStorage.setItem(todoItem, JSON.stringify(obj));

      //화면에 있는 목록에서 데이터 세팅해준다.
      this.todoItems.push(obj)

    },

    removeOneTodo: function (todoItem, index) {


      //로컬스토리지에 있는 데이터 삭제 (key)
      localStorage.removeItem(todoItem.item);

      //splice로 특정 인덱스요소 하나를 지운다.화면상에 todoItems가 바인딩되어있기에 화면에도 삭제된 요소 적용된다.
      this.todoItems.splice(index, 1);

    },

    // eslint-disable-next-line no-unused-vars
    toggleOneComplete: function (todoItem, index) {

      this.todoItems[index].completed = !this.todoItems[index].completed;

      todoItem.completed = !todoItem.completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },

    clearAllItem: function () {
      this.todoItems = [];
      localStorage.clear();

    }
  },


  //created는 인스턴스가 생성되자마자 호출되는 hook(라이프사이클 요소)
  //컴포넌트 초기값 설정 등에 활용
  //실제로 axios 연동하면
  created: function () {
    //로컬스토리지에 데이터가 있다면 for 문 실행
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {

        //localStorage의 ket로 value를 가져온다. (value는 completed와 item으로 구성된 obj)
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

      }
    }
  },

  data: function () {
    return {
      todoItems: []
    }
  }
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>