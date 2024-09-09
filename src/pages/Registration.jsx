import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Mail,
  Lock,
  User,
  Globe,
  FileText,
  Link,
  Settings,
  Hash,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import {
  Button,
  Input,
  Select,
  Alert,
  AlertDescription,
  Textarea,
  Switch,
} from "../components/ui/UI";
import { CountrySelect } from "../components/ui/CountrySelect";
import Api from "../services/Api";

const steps = [
  {
    title: "Account Info",
    fields: ["username", "email", "password", "confirmPassword"],
    icon: User,
  },
  {
    title: "Personal Details",
    fields: ["fullName", "language", "country"],
    icon: Globe,
  },
  {
    title: "Profile Setup",
    fields: ["bio", "hashtags", "websiteUrl"],
    icon: FileText,
  },
  {
    title: "Social Media",
    fields: ["socialMediaLinks"],
    icon: Link,
  },
  { title: "Preferences", fields: ["preferences"], icon: Settings },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
];

const Registration = ({ onLogin }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    language: "",
    country: "",
    bio: "",
    hashtags: [],
    websiteUrl: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      Hash: "",
    },
    preferences: {
      newsletter: false,
      darkMode: false,
      notifications: false,
    },
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "hashtags"
            ? value.split(",").map((tag) => tag.trim())
            : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: {
        ...prev.socialMediaLinks,
        [platform]: value,
      },
    }));
  };

  const handlePreferenceChange = (preference) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference],
      },
    }));
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const stepErrors = {};
    currentFields.forEach((field) => {
      if (
        !formData[field] &&
        field !== "preferences" &&
        field !== "socialMediaLinks"
      ) {
        stepErrors[field] = "This field is required";
      }
    });
    if (currentStep === 0) {
      if (formData.password !== formData.confirmPassword) {
        stepErrors.confirmPassword = "Passwords do not match";
      }
      if (formData.password.length < 8) {
        stepErrors.password = "Password must be at least 8 characters long";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        stepErrors.email = "Invalid email format";
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsLoading(true);
      try {
        const { confirmPassword, ...registrationData } = formData;
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await Api.register(registrationData);
        onLogin(localStorage.getItem("token"));
        // console.log("Registration data:", registrationData);
        navigate("/");
      } catch (err) {
        const response = err.response;
        const msg = response.data.message;
        setErrors({ submit: msg || "Registration failed" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderField = (field) => {
    const commonClasses =
      "w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors duration-200 ease-in-out";

    switch (field) {
      case "language":
        return (
          <Select
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={`${commonClasses} appearance-none`}
          >
            <option value="">Select language</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
        );
      case "country":
        return (
          <CountrySelect
            value={formData.country}
            onChange={(country) =>
              handleChange({ target: { name: "country", value: country } })
            }
            className={commonClasses}
          />
        );
      case "bio":
        return (
          <Textarea
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className={`${commonClasses} h-24 resize-none`}
          />
        );
      case "hashtags":
        return (
          <div className="relative">
            <Hash
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              name={field}
              value={formData[field].join(", ")}
              onChange={handleChange}
              placeholder="Enter hashtags separated by commas"
              className={`${commonClasses} pl-10`}
            />
          </div>
        );
      case "socialMediaLinks":
        return (
          <div className="space-y-4">
            {Object.keys(formData.socialMediaLinks).map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                {platform === "facebook" && (
                  <Facebook size={18} className="text-blue-600" />
                )}
                {platform === "twitter" && (
                  <Twitter size={18} className="text-blue-400" />
                )}
                {platform === "instagram" && (
                  <Instagram size={18} className="text-pink-600" />
                )}
                {platform === "Hash" && (
                  <Hash size={18} className="text-blue-700" />
                )}
                <Input
                  type="text"
                  value={formData.socialMediaLinks[platform]}
                  onChange={(e) =>
                    handleSocialMediaChange(platform, e.target.value)
                  }
                  placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                  className={commonClasses}
                />
              </div>
            ))}
          </div>
        );
      case "preferences":
        return (
          <div className="space-y-4">
            {Object.keys(formData.preferences).map((pref) => (
              <div key={pref} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {pref.charAt(0).toUpperCase() + pref.slice(1)}
                </span>
                <Switch
                  checked={formData.preferences[pref]}
                  onCheckedChange={() => handlePreferenceChange(pref)}
                />
              </div>
            ))}
          </div>
        );
      default:
        const Icon =
          field === "email"
            ? Mail
            : field.includes("password")
              ? Lock
              : field === "websiteUrl"
                ? Link
                : User;
        return (
          <div className="relative">
            <Icon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type={field.includes("password") ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
              }
              className={`${commonClasses} pl-10`}
            />
          </div>
        );
    }
  };

  useEffect(() => {
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Join Notifycode
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
          <div className="mt-4 relative">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
              <div
                id="progress-bar"
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {steps[currentStep].fields.map((field, index) => (
              <div key={field} className={index !== 0 ? "mt-6" : ""}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                {renderField(field)}
                {errors[field] && (
                  <p className="mt-2 text-sm text-red-600">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
          {errors.submit && (
            <Alert variant="flex flex-row destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-between items-center mt-8">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={handlePrevious}
                variant="outline"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ease-in-out"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <Check className="mr-2 h-5 w-5" />
                )}

                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            )}
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 ease-in-out"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
