import Vue from "vue";
import Vuex from "vuex";

// Create a new store instance.

Vue.use(Vuex);

//storage.fetch는 로컬 스토리지에 있는 데이터를 모두 todoItems 상태값에 넣어서 데이터를 리턴해준다.
const storage = {
  fetch() {
    const arr = [];

    //로컬스토리지에 데이터가 있다면 for 문 실행
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          //localStorage의 ket로 value를 가져온다. (value는 completed와 item으로 구성된 obj)
          //console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state() {
    return {
      //헤더에 있는 텍스트를 상태값으로 관리해보자.
      headerText: "Vuex State값으로 적용한 헤더텍스트.",
      //리스트에 뿌려지는 데이터를 상태값으로 관리, 선언과 동시에 스토리지값 불러서 모두 저장
      todoItems: storage.fetch(),
    };
  },
  //mutations를 통해서만 state를 변경해야한다. vuex 규약
  //첫번째 인자는 state명, 두번째 인자는 넘길 데이터
  mutations: {
    addOneItem: function (state, todoItem) {
      //아이템 객체는 해당 리스트 item과 완료 여부에 대한 completed라는 속성으로 구성된다.
      const obj = {
        //생성될때 완료여부 초기값은 false
        completed: false,
        item: todoItem,
      };
      //Brower 로컬스토리지에 저장 localStorage.setItem(key, value) 형태, 개발자도구에서 확인 가능
      //JSON.stringfy 활용으로 객체를 String형태로 집어넣을 수 있다.
      localStorage.setItem(todoItem, JSON.stringify(obj));

      //state로 접근해야 한다.화면에 있는 목록에서 데이터 세팅해준다.
      state.todoItems.push(obj);
    },

    removeOneTodo: function (state, payload) {
      //로컬스토리지에 있는 데이터 삭제 (key)
      localStorage.removeItem(payload.todoItem.item);

      //splice로 특정 인덱스요소 하나를 지운다.화면상에 todoItems가 바인딩되어있기에 화면에도 삭제된 요소 적용된다.
      //마찬가지로 state로 접근해야한다.
      state.todoItems.splice(payload.index, 1);
    },

    toggleOneComplete: function (state, payload) {
      //토글 true, false 컨트롤
      payload.todoItem.completed = !payload.todoItem.completed;

      //DB상으로 지운다.
      localStorage.removeItem(payload.todoItem.item);

      localStorage.setItem(
        payload.todoItem.item,
        JSON.stringify(payload.todoItem)
      );
    },

    clearAllItem: function (state) {
      state.todoItems = [];
      localStorage.clear();
    },
  },
});
