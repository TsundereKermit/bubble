const tokenProvider = new Chatkit.TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e85ec3c9-83f0-40ff-9f45-457141e6177d/token"
  });
  const chatManager = new Chatkit.ChatManager({
    instanceLocator: "v1:us1:e85ec3c9-83f0-40ff-9f45-457141e6177d",
    userId: "tony_userid",
    tokenProvider: tokenProvider
  });

  chatManager
    .connect()
    .then(currentUser => {
      currentUser.subscribeToRoomMultipart({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: message => {
            const ul = document.getElementById("message-list");
            const li = document.createElement("li");
            li.appendChild(
              document.createTextNode(`${message.senderId}: ${
                message.parts[0].payload.content
              }`)
            );
            ul.appendChild(li);
          }
        }
      });

      const form = document.getElementById("message-form");
      form.addEventListener("submit", e => {
        e.preventDefault();
        const input = document.getElementById("message-text");
        currentUser.sendSimpleMessage({
          text: input.value,
          roomId: currentUser.rooms[0].id
        });
        input.value = "";
      });
    })
    .catch(error => {
      console.error("error:", error);
    });