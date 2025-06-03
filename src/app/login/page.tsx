import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
      <AuthForm isLogin />
    </main>
  );
}
