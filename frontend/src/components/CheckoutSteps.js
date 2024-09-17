import { Link, useLocation } from "react-router-dom";
import { CiDeliveryTruck, CiLogin, CiBoxes, CiBank } from "react-icons/ci";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const location = useLocation();

  const steps = [
    { id: 1, name: "Sign In", icon: CiLogin, link: "/login", completed: step1 },
    {
      id: 2,
      name: "Shipping",
      icon: CiDeliveryTruck,
      link: "/shipping",
      completed: step2,
    },
    {
      id: 3,
      name: "Payment",
      icon: CiBank,
      link: "/payment",
      completed: step3,
    },
    {
      id: 4,
      name: "Place Order",
      icon: CiBoxes,
      link: "/placeorder",
      completed: step4,
    },
  ];

  const getStateStyles = (stepLink, completed) => {
    if (location.pathname === stepLink)
      return "bg-yellow-400 text-gray-900 hover:bg-yellow-500";
    if (completed) return "bg-blue-600 text-white hover:bg-blue-700";
    return "bg-gray-200 text-gray-500";
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="flex-1 relative">
                <Link
                  to={step.link}
                  className={`group ${
                    step.completed || location.pathname === step.link
                      ? ""
                      : "pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 ${getStateStyles(
                        step.link,
                        step.completed
                      )}`}
                    >
                      <step.icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        location.pathname === step.link
                          ? "text-yellow-600"
                          : step.completed
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                </Link>
                {stepIdx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full">
                    <div className="h-0.5 bg-gray-200 mx-8" aria-hidden="true">
                      {step.completed && (
                        <div
                          className="h-0.5 bg-blue-600"
                          // style={{ width: "calc(100% - 1.5rem)" }}
                        ></div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default CheckoutSteps;
