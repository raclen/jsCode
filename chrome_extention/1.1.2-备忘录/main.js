/*
 * 定义一个数组，用于存放数据
 */

var TodoList = [];

/*
 *  actions
 */

var actions = {
    addTodo: function(text) {
        return {type: 'add', text: text };
    },

    delTodo: function(id) {
        return { type: 'del', id: id };
    },

    editTodo: function(id, text) {
        return { type: 'edit', id: id, text: text };
    },
    updateTodo: function(id,isfinish) {
        return { type: 'update', id: id, isfinish: isfinish };
    },

    showTodo: function() {
        return { type: 'show', data: TodoList };
    }

}



//初始state
var initialState = {
    data: TodoList,
    id: 0
}

/*
 *  reducer
 */
function todoReducer (state, action) {
    if (state === undefined) {
        state = initialState;
    }
    switch (action.type) {
        case 'add':
            var now =new Date().getTime();
            state.data.unshift({id: now, text: action.text,isfinish: false})
            state.id = now;
            return state
        case 'del':
            for (var i = 0; i < state.data.length; i++) {
                if (action.id === state.data[i].id) {
                    state.data.splice(i, 1);
                }
            }
            return state
        case 'edit':
            for (var i = 0; i < state.data.length; i++) {
                if (action.id === state.data[i].id) {
                    state.data[i].text = action.text;
                }
            }
            return state
        case 'update':
            for (var i = 0; i < state.data.length; i++) {
                if (action.id === state.data[i].id) {
                    state.data[i].isfinish = action.isfinish;
                }
            }
            return state
        case 'show':
            state.data = action.data;
            return state
        default:
            return state
    }
}

/*
 *  创建store
 */
var store = Redux.createStore(todoReducer)

// console.log(JSON.stringify(store.getState(),null,'\t'));

// store.dispatch(actions.addTodo('redux-jQuery-demo'));

// console.log(JSON.stringify(store.getState(),null,'\t'));

// renderList(store.getState());

TodoList = window.localStorage.getItem('todolist')?JSON.parse(window.localStorage.getItem('todolist')):[{id: 123, text: '写ppt', isfinish: true}, {id: 124, text: '申请服务器', isfinish: false}];
store.dispatch(actions.showTodo());
console.log(JSON.stringify(store.getState(), null, '\t'));
renderList(store.getState());
/*
 *  页面上用到的方法
 */


function renderList(state) {
    var data = state.data;
    var ul = $('#todo-ul');
    ul.empty();
    data.forEach(function(item){
        var delhtml = '';
        var ischecked = '';
        if(item.isfinish){
            delhtml = '<span class="badge js_del" >删除</span>';
            ischecked = 'checked';
        }
        ul.append('<li todoid="' + item.id + '" class="list-group-item"><input class="js_update" type="checkbox" '+ischecked+' >' + item.text +delhtml+ '</li>');
    });

    window.localStorage.setItem('todolist',JSON.stringify(data))
}

function addTodo() {
    var state;
    var text = $('#new-todo').val();
    store.dispatch(actions.addTodo(text));
    state = store.getState();
    renderList(state);
}

function delTodo(ele) {
    var state;
    var id = parseInt($(ele).parent().attr('todoid'), 10);
    store.dispatch(actions.delTodo(id));
    state = store.getState();
    renderList(state);
}

function updateTodo(ele){
    var state;
    var checked = $(ele).prop('checked');
    var id = parseInt($(ele).parent().attr('todoid'), 10);
    store.dispatch(actions.updateTodo(id,checked));
    state = store.getState();
    renderList(state);
}

$('#new-todo').on('keyup',function(e){
    if(e.keyCode===13){
        addTodo()
    }

})
$('body').on('click','.js_update',function(){
    updateTodo(this)
})
$('body').on('click','.js_del',function(){
    delTodo(this)
})