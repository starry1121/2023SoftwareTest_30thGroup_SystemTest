<template>
    <div class="conversations">
      <div class="conversation-list">
        <div class="conversation-list-container">
          <div class="conversation-list-content">
            <div v-if="conversations.length">
              <router-link
                v-for="(conversation, key) in conversations" :key="key"
                :to="chatLocation(conversation)"
              >
                <div class="conversation" @contextmenu.prevent.stop="e => showRightClickMenu(e,conversation)">
                  <div class="avatar">
                    <img :src="conversation.data.avatar"/>
                    <div v-if="conversation.unread>0"
                         class="unread-count">
                      <span class="unread">{{ conversation.unread }}</span>
                    </div>
                  </div>
                  <div class="conversation-message">
                    <div class="conversation-top">
                      <span class="conversation-name">{{ conversation.data.name }}</span>
                      <div class="conversation-time">
                        <div>{{ formatDate(conversation.lastMessage.timestamp) }}</div>
                      </div>
                    </div>
                    <div class="conversation-bottom">
                      <div class="conversation-content" v-if="conversation.lastMessage.recalled">
                        <div v-if="conversation.type === 'private'">
                          {{ conversation.lastMessage.senderId === currentUser.id ? '你' : `"${conversation.data.name}"` }}撤回了一条消息
                        </div>
                        <div v-if="conversation.type === 'group'">
                          {{ conversation.lastMessage.senderId === currentUser.id ? '你' : `"${conversation.lastMessage.senderData.name}"` }}撤回了一条消息
                        </div>
                      </div>
                      <div class="conversation-content" v-else>
                        <div class="unread-text"
                             v-if="conversation.lastMessage.read === false && conversation.lastMessage.senderId === currentUser.id">
                          [未读]
                        </div>
                        <div v-if="conversation.type === 'private'">
                          {{ conversation.lastMessage.senderId === currentUser.id ? '我' : conversation.data.name }}:
                        </div>
                        <div v-else>
                          {{ conversation.lastMessage.senderId === currentUser.id ? '我' : conversation.lastMessage.senderData.name }}:
                        </div>
                        <span class="text" v-if="conversation.lastMessage.type === 'text'">{{conversation.lastMessage.payload.text}}</span>
                        <span v-else-if="conversation.lastMessage.type === 'image'">[图片消息]</span>
                        <span v-else-if="conversation.lastMessage.type === 'file'">[文件消息]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <div v-else class="no-conversation">- 当前没有会话 -</div>
          </div>
        </div>
        <div v-if="rightClickMenu.visible" :style="{'left': rightClickMenu.x + 'px', 'top': rightClickMenu.y + 'px'}"
             class="action-box">
          <div class="action-item" @click="topConversation">{{ rightClickMenu.conversation.top ? '取消置顶' : '置顶' }}</div>
          <div class="action-item" @click="deleteConversation">删除聊天</div>
        </div>
      </div>
      <div class="chat">
        <router-view :key="$route.params.id"/>
      </div>
    </div>
  </template>
  
  <script>
    import {ref, reactive, onMounted, onBeforeUnmount, inject} from 'vue';
    import {formatDate} from '../utils/utils'

    export default {
    name: "personConversations",
    setup(){
        const GoEasy = inject('GoEasy');
        const goEasy = inject('goEasy');
        const currentUser = {
            id: '10014',
            name: 'Boaibai',
            password: '123',
            avatar: 'http://dummyimage.com/400x400',
            email: '278803847@qq.com',
            phone: '15379989315',
        };
    
        let conversations = ref([]);
        // Conversation右键菜单
        let rightClickMenu = reactive({
            conversation: null,
            visible: false,
            x: null,
            y: null,
        });
    
        function loadConversations() {
            goEasy.im.latestConversations({
                onSuccess: (result) => {
                let content = result.content;
                renderConversations(content);
                },
                onFailed: (error) => {
                console.log('获取最新会话列表失败, code:' + error.code + 'content:' + error.content);
                },
            });
        }
    
        function listenConversationUpdate() {
            // 监听会话列表变化
            goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, renderConversations);
        }
    
        function renderConversations(content) {
            conversations.value = content.conversations;
        }
    
    
        function showRightClickMenu(e, conversation) {
            rightClickMenu.conversation = conversation;
            rightClickMenu.visible = true;
            rightClickMenu.x = e.pageX;
            rightClickMenu.y = e.pageY;
        }
    
        function hideRightClickMenu() {
            rightClickMenu.visible = false;
        }
    
        function topConversation() {
            let conversation = rightClickMenu.conversation;
            let description = conversation.top ? '取消置顶' : '置顶';
            goEasy.im.topConversation({
                conversation: conversation,
                top: !conversation.top,
                onSuccess: function () {
                console.log(description, '成功');
                },
                onFailed: function (error) {
                console.log(description, '失败：', error);
                },
            });
        }
    
        function deleteConversation() {
            if (confirm('确认要删除这条会话吗？')) {
                let conversation = rightClickMenu.conversation;
                goEasy.im.removeConversation({
                conversation: conversation,
                onSuccess: function () {
                    console.log('删除会话成功');
                },
                onFailed: function (error) {
                    console.log(error);
                },
                });
            }
        }
    
        function chatLocation (conversation) {
          // localStorage.setItem('conversationUserId',conversation.userId);
          let path = '/jobhunter/message/conversations/privatechat/'+conversation.userId
          return {
            path: path,
            query: {
              name: conversation.data.name,
              avatar: conversation.data.avatar
            }
          }
        }
    
        onMounted(() => {
            //隐藏Conversation右键菜单
            document.addEventListener('click', () => {
                hideRightClickMenu();
            });
        
            listenConversationUpdate(); //监听会话列表变化
            loadConversations(); //加载会话列表
        })
    
        onBeforeUnmount(() => {
            goEasy.im.off(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, renderConversations);
        })

        return {
            conversations,
            currentUser,
            rightClickMenu,
            showRightClickMenu,
            hideRightClickMenu,
            topConversation,
            deleteConversation,
            chatLocation,
            formatDate
        };
    },
}
    
  </script>
  
  <style scoped>
    .conversations {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      color: #333333;
    }
  
    .conversation-list {
      width: 220px;
    }
  
    .conversation-list-container {
      height: 70vh;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-right: #dbd6d6 1px solid;
      padding-right: 10px;
    }
  
    .conversation-list-content {
      flex: 1;
      overflow-y: auto;
      padding: 10px 0;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  
    .conversation-list-content::-webkit-scrollbar {
      display: none;
    }
  
    .no-conversation {
      text-align: center;
      color: #666666;
    }
  
    .conversation {
      display: flex;
      padding: 10px 5px;
      cursor: pointer;
    }
  
    .unread-count {
      position: absolute;
      top: -10px;
      left: 30px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      color: white;
      background: #d02129;
    }
  
    .unread-count .unread {
      display: block;
      font-size: 12px;
      text-align: center;
      line-height: 18px;
    }
  
    .conversation-message {
      flex: 1;
      padding-left: 5px;
      font-size: 12px;
      display: flex;
      width: 160px;
      flex-direction: column;
      justify-content: space-around;
    }
  
    .conversation-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: right;
    }
  
    .conversation-name {
      font-size: 12px;
      font-weight: 500;
    }
  
    .conversation-time {
      width: 75px;
      color: #B9B9B9;
      display: flex;
      flex-direction: column;
    }
  
    .conversation-bottom {
      display: flex;
      color: #666666;
    }
  
    .conversation-content {
      display: flex;
      width: 160px;
      color: #b3b3b3;
    }
  
    .conversation-content .text {
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      white-space: nowrap;
      word-break: break-all;
    }
  
    .conversation-bottom .unread-text {
      color: #d02129;
      width: 35px !important;
    }
  
    .conversation .avatar {
      width: 40px;
      height: 40px;
      position: relative;
    }
  
    .conversation .avatar img {
      width: 100%;
      border-radius: 10%;
    }
  
    .action-box {
      width: 100px;
      height: 60px;
      background: #ffffff;
      border: 1px solid #cccccc;
      position: fixed;
      z-index: 100;
      border-radius: 5px;
    }
  
    .action-box .action-item {
      padding-left: 15px;
      line-height: 30px;
      font-size: 13px;
      color: #262628;
      cursor: pointer;
    }
  
    .action-box .action-item:hover {
      background: #dddddd;
    }
  
    .chat {
      flex: 1;
      display: flex;
    }
  
  </style>
  