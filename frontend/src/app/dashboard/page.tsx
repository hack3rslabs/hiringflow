import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default async function Dashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();

  // Fetching data from our NestJS backend
  let students = [];
  try {
    const res = await fetch('http://localhost:3001/students', { cache: 'no-store' });
    if (res.ok) {
      students = await res.json();
    }
  } catch (error) {
    console.error("Backend not running yet", error);
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800">Techwell Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.firstName}</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">Students Pipeline</h2>
          {students.length > 0 ? (
            <ul>
              {students.map((s: any) => (
                <li key={s.id} className="mb-3 p-4 bg-blue-50 rounded shadow-sm border border-blue-100">
                  <p className="font-bold text-gray-800">{s.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{s.email}</p>
                  <div className="flex gap-2 flex-wrap">
                    {s.skills?.map((skill: string) => (
                      <span key={skill} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No students fetched. Ensure the NestJS backend is running.</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-green-600 border-b pb-2">Active Jobs</h2>
          <p className="text-gray-500 italic">Job matching feature coming soon...</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 border-b pb-2">Interviews</h2>
          <p className="text-gray-500 italic">Interview tracking feature coming soon...</p>
        </div>
      </div>
    </div>
  );
}
