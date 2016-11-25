console.time();
var allQuestions = questions.multiSelect.concat(questions.singleSelect).concat(questions.judge);

var questions = {
    multiSelect: questions.multiSelect,
    singleSelect: questions.singleSelect,
    judge: questions.judge,
    allQuestions: allQuestions,
    allLength: allQuestions.length
};
var app = new Vue({
    el: '#root',
    data: {
        questions: questions,
        question: {},
        searchList: [],
        searchValue: '',
        show: false,
        showQuestion: true,
        questionType: 0,
    },
    methods: {
        showAnswer: function() {
            this.show = true;
        },
        getRandom: function() {
            var list = [];
            switch (this.questionType) {
                case 0:
                    list = this.questions.allQuestions;
                    break;
                case 1:
                    list = this.questions.judge;
                    break;
                case 2:
                    list = this.questions.singleSelect;
                    break;
                case 3:
                    list = this.questions.multiSelect;
                    break;
                default:
                    list = this.questions.allQuestions;
            }
            var index = Math.floor(Math.random() * list.length);
            this.question = list[index];
            this.show = false;
            this.showQuestion = true;
        },
        search: function() {
            var _self = this;

            var searchAid = this.questions.allQuestions.filter(function(question) {
                return question.aid == _self.searchValue;
            })

            var searchList = this.questions.allQuestions.filter(function(question) {
                return question.title.indexOf(_self.searchValue) > -1
            })
            this.searchList = searchAid.concat(searchList).slice(0, 50);
            this.showQuestion = false;
        },
        setType: function(questionType) {
            this.questionType = questionType;
            this.getRandom();
        }
    }
})

app.getRandom();
console.timeEnd()
