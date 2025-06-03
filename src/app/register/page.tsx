import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Registro de Nueva Empresa</h1>
      <AuthForm isLogin={false} />
    </main>
  );
}
