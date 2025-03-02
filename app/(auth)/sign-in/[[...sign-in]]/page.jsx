import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-gray-700">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-800 p-12 text-white flex-col justify-center items-start">
          <h2 className="text-4xl font-extrabold">
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300'>mock.ai</span>
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Revolutionizing AI-driven mock testing. Smarter, faster, and more accurate assessments tailored to your needs.
          </p>
        </div>

        <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 sm:p-12 bg-gray-800">
          <h1 className="text-3xl font-bold text-white text-center">
            Welcome to <span className='bg-gradient-to-r from-blue-600 to-white text-transparent bg-clip-text'>mock.ai</span>
          </h1>
          <p className="mt-2 text-gray-400 text-center">
            Sign in to access AI-powered assessments and learning tools.
          </p>
          <div className="mt-6 w-full max-w-sm">
            <SignIn />
          </div>
        </div>
      </div>
    </section>
  );
}
