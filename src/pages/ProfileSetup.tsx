import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

// Options for branch selection
const BRANCH_OPTIONS = [
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Electronics & Communication"
];

// Options for year of study
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

export default function ProfileSetup() {
    const { user, loading, refreshUser } = useAuth();
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        enrollment: "",
        branch: "",
        year: "",
        gender: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Extract enrollment from email (assuming it follows a pattern)
    //   const extractEnrollment = (email: string) => {
    //     // Example pattern: enrollment_number@mitsgwl.ac.in
    //     const match = email.match(/^([^@]+)@/);
    //     return match ? match[1] : "";
    //   };

    useEffect(() => {
        // Redirect if user is already authenticated and profile is complete
        if (!loading && user) {
            if (user.isProfileComplete) {
                navigate('/dashboard');
                return;
            }

            // Pre-fill form with available user data
            setFormData({
                name: user.name || "",
                email: user.email || "",
                enrollment: user.enrollment || "",
                branch: user.branch || "",
                year: user.year || "",
                gender: user.gender || "",
            });
        } else if (!loading && !user) {
            // If not authenticated, redirect to login
            navigate('/login');
        }
    }, [user, loading, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        
        // Set a timeout to force navigation after 5 seconds even if there's an error
        // This prevents users from getting stuck on this screen
        const timeoutId = setTimeout(async () => {
            console.log("Force navigating to dashboard due to timeout");
            try {
                // Try to refresh user data before forcing navigation
                await refreshUser();
            } catch (e) {
                console.error("Error refreshing user data on timeout", e);
            }
            navigate('/dashboard');
        }, 5000);

        try {
            if (!user) {
                throw new Error("User not authenticated");
            }

            console.log("Starting profile update for user:", user.id);
            
            // Get info from current session
            const role = user.role || 'student';

            // First, check if user record exists in users table
            const { data: existingUser, error: checkError } = await supabase
                .from('users')
                .select('id')
                .eq('id', user.id)
                .single();

            if (checkError && checkError.code !== 'PGRST116') {
                console.error("Error checking user existence:", checkError);
                throw checkError;
            }
            
            let dbError;

            if (!existingUser) {
                // Create new user record if it doesn't exist
                const { error: insertError } = await supabase
                    .from('users')
                    .insert([{
                        id: user.id,
                        email: user.email,
                        name: formData.name,
                        role: role,
                        enrollment: formData.enrollment,
                        branch: formData.branch,
                        year: formData.year,
                        gender: formData.gender,
                        isProfileComplete: true,
                        created_at: new Date(),
                        updated_at: new Date()
                    }]);
                
                dbError = insertError;
            } else {
                // Update existing user record
                const { error: updateError } = await supabase
                    .from('users')
                    .update({
                        name: formData.name,
                        enrollment: formData.enrollment,
                        branch: formData.branch,
                        year: formData.year,
                        gender: formData.gender,
                        isProfileComplete: true,
                        updated_at: new Date()
                    })
                    .eq('id', user.id);
                
                dbError = updateError;
            }

            if (dbError) {
                console.error("Database operation error:", dbError);
                // Still try to refresh user data
                try {
                    await refreshUser();
                } catch (e) {
                    console.error("Error refreshing user data after DB error", e);
                }
                // Still navigate to dashboard even if there's a database error
                // The user can try again later if needed
                navigate('/dashboard');
                return;
            }

            // Clear the timeout since we're about to navigate
            clearTimeout(timeoutId);
            
            // Refresh user data to update isProfileComplete status in the context
            await refreshUser();
            
            // Redirect to dashboard after successful update
            navigate('/dashboard');

        } catch (err: any) {
            console.error('Profile update error:', err);
            setError(err.message || "Failed to update profile. Please try again.");
            // We don't navigate here - let the timeout handle it if nothing else works
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div>
                        <label htmlFor="enrollment" className="block text-sm font-medium text-gray-700 mb-1">
                            Enrollment Number
                        </label>
                        <input
                            type="text"
                            id="enrollment"
                            name="enrollment"
                            value={formData.enrollment}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                            Branch
                        </label>
                        <select
                            id="branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        >
                            <option value="">Select Branch</option>
                            {BRANCH_OPTIONS.map(branch => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                        </label>
                        <select
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        >
                            <option value="">Select Year</option>
                            {YEAR_OPTIONS.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Female
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={formData.gender === "other"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Other
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-4 py-2.5 rounded-lg font-medium transition ${isSubmitting
                                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {isSubmitting ? "Saving..." : "Complete Profile"}
                    </button>
                </form>
            </div>
        </main>
    );
}
