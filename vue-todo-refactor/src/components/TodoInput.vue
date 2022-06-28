<template>
    <div class="inputBox shadow">
        <!-- v-model로 input에 입력된 텍스트값을 vue 인스턴스 안의 데이터에 바로 매핑할 수 있다. (자주쓰임)-->
        <!-- v-on:keyup.enter 로 enter 키 입력시에 addTodo 메소드 실행 -->
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />

        <!-- v-on:click는 클릭이벤트를 받고 실행될 메소드(addTodo)를 등록해준다.-->
        <span class="addContainer" v-on:click="addTodo">
            <i class="fa-solid fa-plus addBtn"></i>
        </span>

        <!-- showModal 데이터로 컨트롤된다 -->
        <CommonModal v-if="showModal" @close="showModal = false">


            <h3 slot="header">slot활용 modal의 header slot 재정의</h3>

            <p slot="body">값을 입력하셔야 됩니다.</p>

            <div slot="footer">


                slot활용 footer 재정의

                <button v-on:click="closeModal">닫기</button>
            </div>


        </CommonModal>
    </div>
</template>

<script>
import CommonModal from "./common/CommonModal.vue";


export default {
    // 표준에 의해서 컴포넌트에서 쓰이는 데이터에 대한 선언 및 접근은 아래와 같이 객체형태로 리턴시켜서 컨트롤한다.
    data: function () {
        return {
            newTodoItem: "",
            showModal: false,
        };
    },

    // 컴포넌트 내에서 쓰일 메소드들에 대한 정의는 methods 안에 구현한다.
    methods: {
        addTodo: function () {
            if (this.newTodoItem !== '') {

                // this.$emit('이벤트이름', 인자1,인자2..)
                //부모로 addTodo라는 이름의 이벤트로 추가된 데이터를 올려보내준다.
                this.$emit('addTodoItem', this.newTodoItem)

                //add 이후 input box 비워주기, 내부적으로 추가 선언한 메소드(clearInput) 활용
                this.clearInput();
            } else {
                this.showModal = !this.showModal


            }

        },
        closeModal: function () {
            this.showModal = false;
        },
        clearInput: function () {
            //add기능 이후 input box에 있는 텍스트 초기화시키기-> 바로 화면과 databinding 이 됨을 알 수 있다.
            this.newTodoItem = "";
        },
    },

    components: {
        CommonModal: CommonModal,
    }
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