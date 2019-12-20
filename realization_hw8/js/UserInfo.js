class UserInfo {
    constructor(inp1Element, inp2Element, userName, userJob) {
        this.inp1Element = inp1Element;
        this.inp2Element = inp2Element;
        this.userName = userName;
        this.userJob = userJob;

        this.formProfileInit = this.formProfileInit.bind(this);
        this.formProfileFinish = this.formProfileFinish.bind(this);

    }

   formProfileInit() {
       this.inp1Element.value = this.userName.textContent;
       this.inp2Element.value = this.userJob.textContent;
   }


    formProfileFinish() {
        this.userName.textContent = this.inp1Element.value;
        this.userJob.textContent = this.inp2Element.value;
    }
}
