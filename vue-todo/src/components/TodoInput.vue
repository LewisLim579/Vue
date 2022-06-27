<template>
    <div class="inputBox shadow">
        <!-- v-model로 input에 입력된 텍스트값을 vue 인스턴스 안의 데이터에 바로 매핑할 수 있다. (자주쓰임)-->
        <!-- v-on:keyup.enter 로 enter 키 입력시에 addTodo 메소드 실행 -->
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />

        <!-- v-on:click는 클릭이벤트를 받고 실행될 메소드(addTodo)를 등록해준다.-->
        <span class="addContainer" v-on:click="addTodo">
            <i class="fa-solid fa-plus addBtn"></i>
        </span>
    </div>
</template>

<script>
export default {
    // 표준에 의해서 컴포넌트에서 쓰이는 데이터에 대한 선언 및 접근은 아래와 같이 객체형태로 리턴시켜서 컨트롤한다.
    data: function () {
        return {
            newTodoItem: "",
        };
    },

    // 컴포넌트 내에서 쓰일 메소드들에 대한 정의는 methods 안에 구현한다.
    methods: {
        addTodo: function () {

            //아이템 객체는 해당 리스트 item과 완료 여부에 대한 completed라는 속성으로 구성된다.
            var obj = {
                //생성될때 완료여부 초기값은 false
                completed: false,
                item: this.newTodoItem,
            }

            //this.newTodoItem은 위 data에서 선언한 newTodoItem을 의미
            console.log(this.newTodoItem);

            //Brower 로컬스토리지에 저장 localStorage.setItem(key, value) 형태, 개발자도구에서 확인 가능
            //JSON.stringfy 활용으로 객체를 String형태로 집어넣을 수 있다.
            localStorage.setItem(this.newTodoItem, JSON.stringify(obj));

            //add 이후 input box 비워주기, 내부적으로 추가 선언한 메소드(clearInput) 활용
            this.clearInput();
        },
        clearInput: function () {
            //add기능 이후 input box에 있는 텍스트 초기화시키기-> 바로 화면과 databinding 이 됨을 알 수 있다.
            this.newTodoItem = "";
        },
    },
};
</script>
<style scoped>
input:focus {
    outline: none;
}

.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}

.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}

.addContainer {
    float: right;
    background: linear-gradient(to right, #6475fb, #8763fb);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}

.addBtn {
    color: white;
    vertical-align: middle;
}
</style>