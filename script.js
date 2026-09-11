// DOM객체를 통해 이제 우리가 자바스크립트파일안에있는 코드와
// html파일안에 있는 코드를 연결시켜주는 작업을 진행해보겠습니다.
const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const firstInputs = document.querySelector("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("userPhone");
const registrationForm = document.getElementById("registrationForm")

// "updateHelperText"함수: 입력필드의 유효성검사 통해 도움말을 업데이트
const updateHelperText = (input,message,isValid) =>{
    // let input = 단일input태그;
    // let message = 알림텍스트를 대체할 각 입력필드에 맞는 텍스트를 저장;
    // let isValid = 유효성검사가 잘 통과가 됐으면 true, 유효성검사가 실패하면 false;
    const inputGroup = input.parentElement;
    // 단일 input태그로부터 가장 가까운 부모태그인 div태그를 가리킨다.
    const helperText = inputGroup.getElementsByClassName("helperText")[0];
    
    // 유효성 검사를 통과했을 경우와 유효성 검사를 실패했을 경우를 나눠서 처리합니다.

    // 유효성검사가 통과되어서 입력필드 안의 데이터가 올바를때
    if(isValid==true){
        inputGroup.classList.remove('invalid');
        inputGroup.classList.add('valid');
        helperText.style.visibility = 'hidden';
    }
    // 유효성검사가 통과되지 않아서 입력필드 안의 데이터가 올바르지 않을때
    if(isValid==false){
        inputGroup.classList.remove('valid');
        inputGroup.classList.add('invalid');
        helperText.style.visibility = '';
        helperText.innerText = message;
    }
}

// 입력필드가 비어있는지 확인하는 함수
const checkEmptyInput = (input) =>{
    if(input.value.trim()===""){
        // 입력이 비어있으면 "값을 입력해주세요." 메시지를 보여줌.
        updateHelperText(input,"값을 입력해주세요.",false);
        // return false => 유효성검사가 실패
        return false;
    }else{
        //입력이 있으면 도움말을 지움.
        updateHelperText(input,"",true);
        // return true; => 유효성검사가 성공
        return true;
    }
    }


// 비밀번호 정해진 규칙에 맞게 설정이 되었는지 확인하는 함수
const checkPasswordStrength = (password) =>{
    // 정규식패턴 => 비밀번호설정을 할때 대문자, 소문자, 8자 이상 조건이 달릴때
    // 이러한 조건규칙을 저장하고 있는 텍스트문자열키워드가 있습니다.
    // 정규식패턴이라고 함.
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    // test()함수는 test()함수 안에 들어간 파라미터 password.value의 데이터를 검사하여
    // 정규식패턴이 조건에 성립하면 true를 반환하고 조건이 성립하지 않으면 false를 반환
    if(strongPattern.test(password.value)){
        updateHelperText(password,"비밀번호 강도: 강함",true);
        return true;
    }else{
        updateHelperText(password,"비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야합니다.", false);
        return false;
    }
}

// 비밀번호와 확인비밀번호가 일치하는지 확인하는 함수
const validataPasswordMatch = (passwordInput,confirmInput)=>{
    if(passwordInput.value !== confirmInput.value){
        updateHelperText(confirmInput,"비밀번호가 일치하지 않습니다.",false);
        return false;
    }else{
        updateHelperText(confirmInput,"",true);
        return true;
    }
}

// 이메일 형식이 올바른지 확인하는 함수
const validataEmailFormat = (input)=>{
    // 이메일 정규식패턴을 저장하는 변수를 설정함.
    // 이메일 정규식패턴에는 @골뱅이가 들어가고 .com같은 그런 규칙이 들어감.
    const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(emailPattern.test(input.value.trim())){
        updateHelperText(input,"",true);
        return true;
    }else{
        updateHelperText(input,"유효한 이메일 주소를 입력해주세요",false);
        return false;
    }
}

// 전화번호가 올바른 형식인지 확인하는 함수
// 정규식패턴: 숫자만 조건
const validataPhoneNumber = (input) =>{
    const phonePattern = /^01[0-9]{1}-[0-9]{3,4}-[0-9]{4}$/;
    if(phonePattern.test(input.value.trim())){
        updateHelperText(input,"",true);
        return true;
    }else{
        updateHelperText(input,"유효한 전화번호를 입력해주세요.(ex:010-1234-5678)",false);
        return false;
    }
}

// 모든 Input태그가 정규식패턴을 통과해서 문제가 없음을 식별하는 함수를 설계한것
const validataForm = () =>{
    const isNicknameValid = checkEmptyInput(userNickname);
    const isEmailValid = validataEmailFormat(userEmail);
    const isPasswordStrong = checkPasswordStrength(userPassword);
    const isPasswordMatch = validataPasswordMatch(userPassword,confirmPassword);
    const isPhoneValid = validataPhoneNumber(userPhone);

    // 모든 검사가 통과해야 제출 가능.
    return isNicknameValid && isEmailValid && isPasswordStrong && isPasswordMatch && isPhoneValid;
}

registrationForm.addEventListener("submit",(e)=>{
    e.preventDefault(); //페이지 새로고침을 없애는 기능
    if(validataForm()){
        console.log("모든 필드가 유효합니다.");
        // 데이터(프론트엔드)를 서버(백엔드영역)로 전송하는 로직을 여기에 추가
    }else{
        console.log("유효성검사 실패");
    }   
})

// 모든 input태그들중 한개씩 일일히 실시간으로 유효성 검사를 수행하는 이벤트 리스너 추가
// 반복적으로 각 입력 필드를 확인하는 것과 같습니다.
document.querySelectorAll("input").forEach(input=>{
    input.addEventListener('input',()=>{
        switch(input.id){
            case "userNickname":
                checkEmptyInput(userNickname);
                break;
            case "userEmail":
                validataEmailFormat(userEmail);
                break;
            case "userPassword":
                checkPasswordStrength(userPassword);
                break;
            case "confirmPassword":
                validataPasswordMatch(userPassword,confirmPassword);
                break;
            case "userPhone":
                validataPhoneNumber(userPhone);
                break;
        }
    })
})