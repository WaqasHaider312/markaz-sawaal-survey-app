
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

type SurveyData = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: ''
  });

  const handleAnswer = (question: keyof SurveyData, answer: string) => {
    setSurveyData(prev => ({ ...prev, [question]: answer }));
    if (currentPage < 7) {
      setTimeout(() => setCurrentPage(currentPage + 1), 300);
    }
  };

  const handleSubmit = () => {
    console.log('Survey Data:', surveyData);
    toast({
      title: "Shukriya! 🎉",
      description: "Aapka feedback successfully submit ho gaya hai.",
    });
    setCurrentPage(7);
  };

  const WelcomePage = () => (
    <div className="text-center animate-fade-in">
      <div className="text-6xl mb-6">👋</div>
      <h1 className="text-3xl font-bold text-markaz-green mb-4">
        Assalamualaikum Reseller Family!
      </h1>
      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
        Aapke feedback se hi humari customer support team aur behtar ban sakti hai.
        <br />
        <span className="text-markaz-green font-medium">Yeh sirf 1 minute ka chhota sa survey hai 💬</span>
      </p>
      <Button 
        onClick={() => setCurrentPage(1)}
        className="bg-markaz-green hover:bg-markaz-green/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Start Survey
      </Button>
    </div>
  );

  const Question1 = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Support team se baat karna aapko kaisa lagta hai?
      </h2>
      <div className="space-y-4">
        {[
          { text: "✅ Bohat asaan", value: "very_easy" },
          { text: "🙂 Theek tha", value: "okay" },
          { text: "🤔 Thoda mushkil", value: "difficult" },
          { text: "😕 Samajh nahi aata kya karna hota hai", value: "confusing" }
        ].map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className="w-full p-6 text-left text-lg rounded-2xl border-2 hover:border-markaz-green hover:bg-markaz-light transition-all duration-200 justify-start"
            onClick={() => handleAnswer('q1', option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );

  const Question2 = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Aapko support ka jawab kitni der me milta hai?
      </h2>
      <div className="space-y-4">
        {[
          { text: "⚡ 1 ghante ke andar", value: "within_1_hour" },
          { text: "⏱️ 1–4 ghante me", value: "1_4_hours" },
          { text: "🕒 1 din ke baad", value: "after_1_day" },
          { text: "💤 Bohat late / kabhi nahi", value: "very_late_never" }
        ].map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className="w-full p-6 text-left text-lg rounded-2xl border-2 hover:border-markaz-green hover:bg-markaz-light transition-all duration-200 justify-start"
            onClick={() => handleAnswer('q2', option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );

  const Question3 = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Kya aapka masla solve hua tha jab aapne support se contact kiya?
      </h2>
      <div className="space-y-4">
        {[
          { text: "✅ Haan, asaani se", value: "solved_easily" },
          { text: "🔁 Haan, lekin follow-up karna para", value: "solved_with_followup" },
          { text: "❌ Nahi hua", value: "not_solved" },
          { text: "📞 Bar bar contact karna para", value: "multiple_contacts" }
        ].map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className="w-full p-6 text-left text-lg rounded-2xl border-2 hover:border-markaz-green hover:bg-markaz-light transition-all duration-200 justify-start"
            onClick={() => handleAnswer('q3', option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );

  const Question4 = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Support team ka lehja aur attitude kaisa tha?
      </h2>
      <div className="space-y-4">
        {[
          { text: "🤝 Friendly aur helpful", value: "friendly_helpful" },
          { text: "🙂 Theek tha", value: "okay" },
          { text: "😐 Rude ya uninterested laga", value: "rude_uninterested" },
          { text: "🙅‍♂️ Mujhe baat hi nahi hui support se", value: "no_contact" }
        ].map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className="w-full p-6 text-left text-lg rounded-2xl border-2 hover:border-markaz-green hover:bg-markaz-light transition-all duration-200 justify-start"
            onClick={() => handleAnswer('q4', option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );

  const Question5 = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Aapko sabse zyada kya acha laga support ke system me?
      </h2>
      <div className="space-y-4">
        {[
          { text: "⚡ Jaldi jawab milta hai", value: "quick_response" },
          { text: "📘 Clear instructions milti hain", value: "clear_instructions" },
          { text: "🛠️ Masla solve ho jata hai", value: "problem_solving" },
          { text: "😕 Kuch bhi acha nahi laga", value: "nothing_good" }
        ].map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className="w-full p-6 text-left text-lg rounded-2xl border-2 hover:border-markaz-green hover:bg-markaz-light transition-all duration-200 justify-start"
            onClick={() => handleAnswer('q5', option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );

  const Question6 = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Kisi ek baat ka suggestion dein jo support team ko aur behtar bana sakti hai.
      </h2>
      <div className="space-y-6">
        <Textarea
          placeholder="Aapka idea yahan likhein..."
          className="min-h-[120px] text-lg p-4 rounded-2xl border-2 focus:border-markaz-green resize-none"
          value={surveyData.q6}
          onChange={(e) => setSurveyData(prev => ({ ...prev, q6: e.target.value }))}
        />
        <Button 
          onClick={handleSubmit}
          className="w-full bg-markaz-green hover:bg-markaz-green/90 text-white py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={!surveyData.q6.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const ThankYouPage = () => (
    <div className="text-center animate-fade-in">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-markaz-green mb-4">
        Shukriya!
      </h1>
      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
        Aapki feedback humari team ke liye bohat important hai.
        <br />
        <span className="text-markaz-green font-medium">Top feedback dene walon ko chhota sa gift milega 🎁</span>
      </p>
      <Button 
        onClick={() => {
          setCurrentPage(0);
          setSurveyData({
            q1: '', q2: '', q3: '', q4: '', q5: '', q6: ''
          });
        }}
        className="bg-markaz-green hover:bg-markaz-green/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Submit & Close
      </Button>
    </div>
  );

  const pages = [
    <WelcomePage />,
    <Question1 />,
    <Question2 />,
    <Question3 />,
    <Question4 />,
    <Question5 />,
    <Question6 />,
    <ThankYouPage />
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-markaz-light to-white font-nunito">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Progress Bar */}
        {currentPage > 0 && currentPage < 7 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentPage} of 6</span>
              <span>{Math.round((currentPage / 6) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-markaz-green h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentPage / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <Card className="p-8 shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
          {pages[currentPage]}
        </Card>

        {/* Back Button */}
        {currentPage > 1 && currentPage < 7 && (
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mt-6 text-gray-500 hover:text-markaz-green"
          >
            ← Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
