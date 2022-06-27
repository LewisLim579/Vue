Vue.js 빠른 적응을 위한 샘플 To-Do-List 예제 Repository

vue-todo : 각 컴포넌트에서 각자가 메소드를 가지는 형태로 구현한 To-do-List
vue-todo-refactoring : vue-todo 어플리케이션 구조개선 

- v-on:click="매핑되는 메서드 명" : 클릭을 할 때 실행되는 메서드와 매핑시켜준다
- v-on:keyup.enter="addTodo" : 마우스 클릭이 아닌 enter 키를 통해서 입력가능
- v-bind:key="xxxx" : 뷰 인스턴스의 데이터 속성을 해당 HTML 요소에 연결
- v-model="xxxx" : v-bind & v-on 을 합쳐놓은것 (사용자가 입력하면 자동으로 데이터가 없데이트 됨) ※ 근데 한글 같은 경우는 마지막 글자가 한번 씹히는 문제가 있는듯
- v-for="(todoItem,index) in todoItems" v-bind:key="todoItem.item" : 연결된 뷰 데이터 를 for문 돌릴 수 있다. todoItem 만 넣고 돌려도 됨 index 를 추가하면 자동으로 인덱스를 매겨줌, 이때 v-bind:key="xxx" 여기는 유니크한 String or 숫자 만 가능
- v-bind:class="{적용할 css: 특정 값}" : 특정 값의 true,false 여부에 따라서 css를 적용할 수 있다.
- v-bind:내려보낼 프롭스 속성 이름="현재 위치의 컴포넌트 데이터 속성"
- v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메서드 명" : emit 을 받을 때