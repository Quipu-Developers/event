import StartLayout from "@/components/StartLayout/StartLayout";

export default function Start() {
  return (
    <StartLayout
      button1="로그인"
      button2="회원가입"
      path1="/login"
      path2="/register"
    />
  );
}
