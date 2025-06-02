import AuthForm from '@/components/AuthForm'

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <AuthForm isLogin={false} />
    </main>
  )
}