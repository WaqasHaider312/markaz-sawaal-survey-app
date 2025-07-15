
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

type SurveyData = {
  [key: string]: string;
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({});

  const handleAnswer = (questionId: string, answer: string) => {
    setSurveyData(prev => ({ ...prev, [questionId]: answer }));
    
    // Handle conditional logic
    const nextPage = getNextPage(questionId, answer);
    setTimeout(() => setCurrentPage(nextPage), 300);
  };

  const handleTextAnswer = (questionId: string, value: string) => {
    setSurveyData(prev => ({ ...prev, [questionId]: value }));
  };

  const getNextPage = (questionId: string, answer: string): number => {
    const currentPageIndex = pages.findIndex(p => p.id === questionId);
    
    // Conditional logic mapping
    const conditionalRoutes: { [key: string]: { [key: string]: string } } = {
      'q1': {
        '🤔 Thoda mushkil': 'q1a',
        '😕 Samajh nahi aata kya karna hota hai': 'q1a'
      },
      'q2': {
        '❌ Nahi hota hai': 'q2a',
        '📞 Bar bar contact karna parta hai': 'q2a'
      },
      'q2a': {
        '📦 Order ki delivery kay issues': 'q2a1',
        '🔄 Status update kay issues': 'q2a2',
        '💸 Return / Refunds kay issues': 'q2a3',
        '💰 Profit / Bonus kay issues': 'q2a4'
      },
      'q3': {
        '🙂 Theek hai, lekin aur behtar ho sakta hai': 'q3b',
        '😐 Rude ya uninterested lagta hai': 'q3a'
      },
      'q4': {
        '🔁 Automatic reattempt request form': 'q4a',
        '❌ Order cancellation form': 'q4b',
        '🇨🇳 China parcels ka form': 'q4c'
      }
    };

    if (conditionalRoutes[questionId] && conditionalRoutes[questionId][answer]) {
      const targetPageId = conditionalRoutes[questionId][answer];
      const targetPageIndex = pages.findIndex(p => p.id === targetPageId);
      return targetPageIndex;
    }

    // Default: go to next page
    return currentPageIndex + 1;
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  // Replace the old handleSubmit with the new async version
  const handleSubmit = async () => {
    console.log('Survey Data:', surveyData);

    // Prepare payload to match your Google Sheet columns
    const payload = {
      timestamp: new Date().toISOString(),
      resellerId: surveyData['resellerId'] || '',
      q1: surveyData['q1'] || '',
      q1a: surveyData['q1a'] || '',
      q2: surveyData['q2'] || '',
      q2a: surveyData['q2a'] || '',
      q2aX: surveyData['q2a1'] || surveyData['q2a2'] || surveyData['q2a3'] || surveyData['q2a4'] || '',
      q3: surveyData['q3'] || '',
      q3ab: surveyData['q3a'] || surveyData['q3b'] || '',
      q4: surveyData['q4'] || '',
      q4abc: surveyData['q4a'] || surveyData['q4b'] || surveyData['q4c'] || '',
      good1: surveyData['q5_0'] || '',
      good2: surveyData['q5_1'] || '',
      good3: surveyData['q5_2'] || '',
      bad1: surveyData['q5_3'] || '',
      bad2: surveyData['q5_4'] || '',
      bad3: surveyData['q5_5'] || ''
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzeqm-BD9rXOi2JC9rkBjwVYO43yeoEyh-wvWmpFsFLGU39CrTiHZv0sKK6GMzz0_Ai/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("✅ Google Sheet response:", result);

      toast({
        title: "🎉 Shukriya!",
        description: "Aapka feedback successfully submit ho gaya hai.",
      });

      setCurrentPage(pages.length); // Show thank you page

    } catch (error) {
      console.error("❌ Error saving to Sheet:", error);
      toast({
        title: "⚠️ Error",
        description: "Feedback submit nahi ho paaya. Dobara try karein.",
      });
    }
  };

  const WelcomePage = () => (
    <div className="text-center animate-fade-in">
      <div className="text-6xl mb-6">👋</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Assalamualaikum Reseller Family!
      </h1>
      <div className="text-lg text-gray-600 mb-8 leading-relaxed space-y-4">
        <p className="text-markaz-green font-medium">
          Aapka feedback humare liye bohat important hai 💚
        </p>
        <p>
          Yeh chota sa survey sirf 1–2 minute ka hai jisme aap apna asal experience batayein — na zyada tareef, na zyada shikayat — bas jo <strong>real</strong> mehsoos hua wohi likhein ✍️
        </p>
        <p>
          Aapki baat directly support team tak pohchayi jaayegi taake hum behtar ban saken ✅
        </p>
        <p className="font-medium">
          Shuru karte hain? 👇
        </p>
      </div>
      <Button 
        onClick={() => setCurrentPage(1)}
        className="bg-markaz-green hover:bg-markaz-green/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Start Survey
      </Button>
    </div>
  );

  const MultipleChoiceQuestion = ({ page }: { page: any }) => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {page.question}
      </h2>
      <div className="space-y-4">
        {page.options.map((option: string, index: number) => (
          <Button
            key={index}
            variant="outline"
            className="w-full h-16 p-4 text-left text-base leading-tight rounded-2xl border-2 hover:border-markaz-green hover:bg-markaz-light transition-all duration-200 justify-start items-center flex"
            onClick={() => handleAnswer(page.id, option)}
          >
            <span className="truncate">{option}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  const TextInputQuestion = ({ page }: { page: any }) => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {page.question}
      </h2>
      <div className="space-y-6">
        <Textarea
         placeholder="Aapka jawab yahan likhein..."
         className="min-h-[120px] text-lg p-4 rounded-2xl border-2 focus:border-markaz-green resize-none"
         value={surveyData[page.id] || ''}
          onChange={(e) => {
          const text = e.target.value;
          const wordLimit = page.maxWords || 10;
          const wordCount = text.trim().split(/\s+/).length;

        if (wordCount <= wordLimit) {
          handleTextAnswer(page.id, text);
          } else {
          toast({
          title: "Maximum words exceeded",
          description: `Sirf ${wordLimit} alfaaz likhein.`,
    });
    }
  }}
/>

        <p className="text-sm text-gray-500 text-center">
          {page.maxWords && `Maximum ${page.maxWords} words`}
        </p>
        <Button 
          onClick={goToNextPage}
          className="w-full bg-markaz-green hover:bg-markaz-green/90 text-white py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={!surveyData[page.id]?.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const GroupQuestion = ({ page }: { page: any }) => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {page.question}
      </h2>
      <div className="space-y-6">
        {page.fields.map((field: any, index: number) => (
          <div key={index} className="space-y-2">
            <label className="text-lg font-medium text-gray-700">
              {index < 3 ? field.label : field.label.replace('Behtar cheez', 'Is cheez main behtari ki zarurat hai')}
            </label>
            <Input
              placeholder="Yahan likhein..."
              className="text-lg p-4 rounded-2xl border-2 focus:border-markaz-green"
              value={surveyData[`${page.id}_${index}`] || ''}
              onChange={(e) => {
                const words = e.target.value.split(' ').filter(word => word.length > 0);
                if (words.length <= (field.maxWords || 10)) {
                  handleTextAnswer(`${page.id}_${index}`, e.target.value);
                }
              }}
            />
            <p className="text-sm text-gray-500">
              Maximum {field.maxWords || 10} words
            </p>
          </div>
        ))}
        <Button 
          onClick={goToNextPage}
          className="w-full bg-markaz-green hover:bg-markaz-green/90 text-white py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={!page.fields.every((_: any, index: number) => surveyData[`${page.id}_${index}`]?.trim())}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const ThankYouPage = () => (
  <div className="text-center animate-fade-in">
    <div className="text-6xl mb-6">🎉</div>
    <h2 className="text-2xl font-bold mb-4">Shukriya!</h2>
    <p className="text-lg text-gray-600">Aapka survey submit ho gaya hai.</p>
  </div>
);



  // Define all pages
  const pages = [
    { id: 'welcome', type: 'welcome' },
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'Support team se baat karna aapko kaisa lagta?',
      options: [
        '✅ Asaan',
        '🙂 Theek tha',
        '🤔 Thoda mushkil',
        '😕 Samajh nahi aata kya karna hota hai'
      ]
    },
    {
      id: 'q1a',
      type: 'multiple-choice',
      question: 'Aapko kis cheez me sabse zyada mushkil hui?',
      options: [
        '🤖 Bot ka jawab sahi nahi hota',
        '⌛ Bot agent ko jaldi transfer nahi karta',
        '🙋‍♀️ Seedha human se baat karne ka option hona chahiye',
        '🔁 Bar bar same baat dobara likhni parti hai',
        '✍️ Aur koi wajah (please specify)'
      ]
    },
    {
      id: 'q1a_text',
      type: 'text',
      question: 'Kripya apni wajah 10 words mein likhein:',
      maxWords: 10
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'Kya helpline per rabta karne se aapka issue resolve hota hai?',
      options: [
        '🟢 Haan, asaani se ho jata hai',
        '🔁 Haan, lekin follow-up karna parta hai',
        '❌ Nahi hota hai',
        '📞 Bar bar contact karna parta hai'
      ]
    },
    {
      id: 'q2a',
      type: 'multiple-choice',
      question: 'Aap kis type ke maslay ke liye helpline aapki itni support nahi kar pati?',
      options: [
        '📦 Order ki delivery kay issues',
        '🔄 Status update kay issues',
        '💸 Return / Refunds kay issues',
        '💰 Profit / Bonus kay issues',
        '✍️ All Above'
      ]
    },
    {
      id: 'q2a1',
      type: 'multiple-choice',
      question: 'Delivery issue kis type ka tha?',
      options: [
        'Late delivery ho rahi thi',
        'Courier se contact nahi ho pa raha tha',
        'Delivery status galat dikh raha tha',
        'Order lost ho gaya tha'
      ]
    },
    {
      id: 'q2a2',
      type: 'multiple-choice',
      question: 'Status issue kis jagah confuse kar raha tha?',
      options: [
        'App me "Delivered" likha tha lekin mila nahi',
        '"Out for delivery" pe atka hua tha',
        '"No update" dikh raha tha',
        'Status bar samajh nahi aayi'
      ]
    },
    {
      id: 'q2a3',
      type: 'multiple-choice',
      question: 'Return ya refund me kya masla tha?',
      options: [
        'Refund delay ho gaya',
        'Return request accept nahi hui',
        'Parcel khud return karna para',
        'Amount galat mila wapis'
      ]
    },
    {
      id: 'q2a4',
      type: 'multiple-choice',
      question: 'Profit ya bonus ka kya masla tha?',
      options: [
        'Profit amount kam mila',
        'Bonus show nahi ho raha tha',
        'Boht late profit mila tha',
        'App per paid show ho raha tha but mila nahi'
      ]
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'Support team ka lehja aur attitude kaisa hota hai?',
      options: [
        '🤝 Friendly aur helpful',
        '🙂 Theek hai, lekin aur behtar ho sakta hai',
        '😐 Rude ya uninterested lagta hai',
        '🙅 Mujhe baat hi nahi hui support se'
      ]
    },
    {
      id: 'q3a',
      type: 'multiple-choice',
      question: 'Aapko kaisa laga unka attitude?',
      options: [
        '😤 Baat properly nahi sunte',
        '🙄 Boring / uninterested tone hoti hai',
        '⌛ Sirf auto replies milte rahte hain',
        '💬 Bar bar agent change hota rahta hai',
        '✍️ Koi aur reason? (please specify)'
      ]
    },
    {
      id: 'q3b',
      type: 'multiple-choice',
      question: 'Aapko Support team ke attitude main kya change chahiye?',
      options: [
        '🙋‍♂️ Zyada patience hona chahiye',
        '📢 Clear aur direct jawab dena chahiye',
        '💬 Personal touch hona chahiye — scripted nahi',
        '✍️ Koi aur suggestion?'
      ]
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'Kya aap in me se koi Markaz support tools use kar chuke hain?',
      options: [
        '🔁 Automatic reattempt request form',
        '❌ Order cancellation form',
        '🇨🇳 China parcels ka form',
        '🚫 Nahi, in me se koi bhi use nahi kiya'
      ]
    },
    {
      id: 'q4a',
      type: 'multiple-choice',
      question: 'Kya reattempt form se aapka masla solve hua tha?',
      options: [
        '✅ Haan, easy tha aur kaam ho gaya',
        '⚠️ Nahi, form fill kiya lekin koi response nahi aaya',
        '🔁 Dubara try karna para',
        '✍️ Koi aur masla'
      ]
    },
    {
      id: 'q4b',
      type: 'multiple-choice',
      question: 'Cancellation form fill karne ke baad kya hua?',
      options: [
        '✅ Order cancel ho gaya timely',
        '🕒 Boht der lagi cancel hone me',
        '🚫 Cancel nahi hua, support se contact karna para',
        '✍️ Koi aur issue tha'
      ]
    },
    {
      id: 'q4c',
      type: 'multiple-choice',
      question: 'Aapko China parcel form samajh aaya tha?',
      options: [
        '✅ Haan, clear tha and issue resolve ho gaya',
        '🤔 Samajhne me thoda mushkil tha',
        '❓ Confusion hui ke form ka matlab kya hai',
        '✍️ Suggestion dena chahte hain'
      ]
    },
    {
      id: 'q5',
      type: 'group',
      question: 'Markaz app ki 3 acchi aur 3 behtar banane wali cheezein likhein:',
      fields: [
        { type: 'text', label: '1. Achi cheez', required: true, maxWords: 10 },
        { type: 'text', label: '2. Achi cheez', required: true, maxWords: 10 },
        { type: 'text', label: '3. Achi cheez', required: true, maxWords: 10 },
        { type: 'text', label: '1. Is cheez main behtari ki zarurat hai', required: true, maxWords: 10 },
        { type: 'text', label: '2. Is cheez main behtari ki zarurat hai', required: true, maxWords: 10 },
        { type: 'text', label: '3. Is cheez main behtari ki zarurat hai', required: true, maxWords: 10 }
      ]
    },
    { id: 'thankyou', type: 'thankyou' }
  ];


  const renderCurrentPage = () => {
    if (currentPage === 0) return <WelcomePage />;
    if (currentPage >= pages.length) {
      // Fallback to thank you page if somehow we exceed bounds
      const thankYouIndex = pages.findIndex(p => p.id === 'thankyou');
      if (thankYouIndex !== -1) {
        setCurrentPage(thankYouIndex);
        return <ThankYouPage />;
      }
      return <ThankYouPage />;
    }
    
    const page = pages[currentPage];
    
    if (!page) {
      return <ThankYouPage />;
    }
    
    switch (page.type) {
      case 'multiple-choice':
        return <MultipleChoiceQuestion page={page} />;
      case 'text':
        return <TextInputQuestion page={page} />;
      case 'group':
        return <GroupQuestion page={page} />;
      case 'thankyou':
        return <ThankYouPage />;
      default:
        return <div>Unknown page type</div>;
    }
  };

  const getTotalQuestions = () => {
    return pages.filter(p => p.type !== 'welcome' && p.type !== 'thankyou').length;
  };

  const getCurrentQuestionNumber = () => {
    if (currentPage === 0 || currentPage >= pages.length) return 0;
    const page = pages[currentPage];
    if (page?.type === 'thankyou') return getTotalQuestions();
    return Math.min(currentPage, getTotalQuestions());
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Progress Bar */}
        {currentPage > 0 && pages[currentPage]?.type !== 'thankyou' && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {getCurrentQuestionNumber()} of {getTotalQuestions()}</span>
              <span>{Math.round((getCurrentQuestionNumber() / getTotalQuestions()) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(getCurrentQuestionNumber() / getTotalQuestions()) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <Card className="p-8 shadow-2xl border-0 rounded-3xl bg-white">
          {renderCurrentPage()}
        </Card>

        {/* Back Button */}
        {currentPage > 1 && pages[currentPage]?.type !== 'thankyou' && (
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mt-6 text-gray-500 hover:text-primary rounded-full"
          >
            ← Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
