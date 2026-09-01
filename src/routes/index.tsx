import { set, get } from "idb-keyval";
import ReactMarkdown from "react-markdown";
import { createServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Lock,
  Zap,
  Infinity as InfinityIcon,
  Ban,
  ShieldCheck,
  Sparkles,
  Loader2,
  CheckCircle2,
  Sun,
  Moon,
  Globe,
  Copy,
  Check,
  Printer,
  History,
  X,
  Code2
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export type Language = "en" | "es" | "pt" | "fr" | "hi" | "zh";

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
  hi: "Hindi",
  zh: "Simplified Chinese"
};

// القاموس المركزي الشامل لكامل الصفحة مخصص للأكواد البرمجية
export const translations: Record<Language, any> = {
  en: {
    uploadTab: "Upload File", pasteTab: "Paste Code", optimizeBtn: "Clean Code",
    analyzingPdf: "AI is documenting your code...",
    extractingConcepts: "adding standard comments & clean structure",
    uploadPdf: "Upload Code File",
    uploadAnother: "Clean Another Code",
    uploadNow: "Clean Code Now",
    dropPdf: "Drop your source code here",
    browseFiles: "Browse Files",
    analyzing: "AI is analyzing your code…",
    summaryReady: "Your documented code is ready",
    unlockFull: "Unlock Code & Get 100 Credits for $1",
    useCredit: "Use 1 Credit (Remaining: ",
    remainingCredits: "Remaining Credits: ",
    copy: "Copy Code",
    copied: "Copied!",
    exportPdf: "Export PDF",
    activeCreditsHint: "You have active credits. Unlock your code instantly!",
    noCreditsHint: "Unlock the documented code and get 100 lifetime credits.",
    importantNote: "⚠️ **Important Note:** You can use the service without an account, but please do not clear your browser data or change devices to avoid losing your credits.",
    badge: "Built for developers · 100 credits for $1",
    heroTitle1: "Clean & Document",
    heroTitle2: "Your Code",
    heroTitle3: "in Seconds",
    heroSubtitle1: "Pay ",
    heroSubtitle2: "$1 once",
    heroSubtitle3: ". Get ",
    heroSubtitle4: "100 clean code generations",
    heroSubtitle5: " forever. Zero monthly subscriptions.",
    secureTry: "Secure · No signup to try",
    dropzoneHint: "or tap to browse · source files up to 50 MB",
    card1Title: "Production-Ready",
    card1Desc: "Formats your raw code with standard comments and clean architecture.",
    card2Title: "Lifetime Credits",
    card2Desc: "Your 100 credits never expire. Use them for future projects.",
    card3Title: "No Subscriptions",
    card3Desc: "One-time $1 payment. Never get charged monthly.",
    footer: "© 2026 CodePing · Made for developers, not shareholders."
  },
  es: {
    uploadTab: "Subir Archivo", pasteTab: "Pegar Código", optimizeBtn: "Limpiar Código",
    analyzingPdf: "La IA está documentando tu código...",
    extractingConcepts: "añadiendo comentarios y estructura limpia",
    uploadPdf: "Subir Archivo de Código",
    uploadAnother: "Limpiar Otro Código",
    uploadNow: "Limpiar Código Ahora",
    dropPdf: "Suelta tu código fuente aquí",
    browseFiles: "Buscar Archivos",
    analyzing: "La IA está analizando tu código…",
    summaryReady: "Tu código documentado está listo",
    unlockFull: "Desbloquear Código y Obtener 100 Créditos por $1",
    useCredit: "Usar 1 Crédito (Restante: ",
    remainingCredits: "Créditos restantes: ",
    copy: "Copiar Código",
    copied: "¡Copiado!",
    exportPdf: "Exportar PDF",
    activeCreditsHint: "Tienes créditos activos. ¡Desbloquea tu código al instante!",
    noCreditsHint: "Desbloquea el código documentado y obtén 100 créditos de por vida.",
    importantNote: "⚠️ **Nota Importante:** Puedes usar el servicio sin cuenta, pero por favor no borres los datos de tu navegador ni cambies de dispositivo.",
    badge: "Creado para desarrolladores · 100 créditos por $1",
    heroTitle1: "Limpia y Documenta",
    heroTitle2: "Tu Código",
    heroTitle3: "en Segundos",
    heroSubtitle1: "Paga ",
    heroSubtitle2: "$1 una vez",
    heroSubtitle3: ". Obtén ",
    heroSubtitle4: "100 generaciones de código limpio",
    heroSubtitle5: " para siempre. Cero suscripciones mensuales.",
    secureTry: "Seguro · Sin registro para probar",
    dropzoneHint: "o haz clic para explorar · archivos fuente hasta 50 MB",
    card1Title: "Listo para Producción",
    card1Desc: "Formatea tu código sin procesar con comentarios estándar y arquitectura limpia.",
    card2Title: "Créditos de por Vida",
    card2Desc: "Tus 100 créditos nunca caducan. Úsalos para proyectos futuros.",
    card3Title: "Sin Suscripciones",
    card3Desc: "Pago único de $1. Nunca más se te cobrará mensualmente.",
    footer: "© 2026 CodePing · Hecho para desarrolladores, no para accionistas."
  },
  pt: {
    uploadTab: "Enviar Arquivo", pasteTab: "Colar Código", optimizeBtn: "Limpar Código",
    analyzingPdf: "A IA está documentando seu código...",
    extractingConcepts: "adicionando comentários e estrutura limpa",
    uploadPdf: "Enviar Arquivo de Código",
    uploadAnother: "Limpar Outro Código",
    uploadNow: "Limpar Código Agora",
    dropPdf: "Solte seu código fonte aqui",
    browseFiles: "Procurar Arquivos",
    analyzing: "A IA está analisando seu código…",
    summaryReady: "Seu código documentado está pronto",
    unlockFull: "Desbloquear Código e Obter 100 Créditos por $1",
    useCredit: "Usar 1 Crédito (Restante: ",
    remainingCredits: "Créditos restantes: ",
    copy: "Copiar Código",
    copied: "Copiado!",
    exportPdf: "Exportar PDF",
    activeCreditsHint: "Você tem créditos ativos. Desbloqueie seu código instantaneamente!",
    noCreditsHint: "Desbloqueie o código documentado e obtenha 100 créditos vitálicos.",
    importantNote: "⚠️ **Nota Importante:** Você pode usar o serviço sem uma conta, mas não limpe os dados do navegador nem mude de dispositivo.",
    badge: "Feito para desenvolvedores · 100 créditos por $1",
    heroTitle1: "Limpe e Documente",
    heroTitle2: "Seu Código",
    heroTitle3: "em Segundos",
    heroSubtitle1: "Pague ",
    heroSubtitle2: "$1 uma vez",
    heroSubtitle3: ". Obtenha ",
    heroSubtitle4: "100 gerações de código limpo",
    heroSubtitle5: " para sempre. Zero assinaturas mensais.",
    secureTry: "Seguro · Sem registro para testar",
    dropzoneHint: "ou clique para procurar · arquivos fonte até 50 MB",
    card1Title: "Pronto para Produção",
    card1Desc: "Formata seu código com comentários padrão e arquitetura limpa.",
    card2Title: "Créditos Vitalícios",
    card2Desc: "Seus 100 créditos nunca expiram. Use-os para projetos futuros.",
    card3Title: "Sem Assinaturas",
    card3Desc: "Pagamento único de $1. Nunca mais seja cobrado mensalmente.",
    footer: "© 2026 CodePing · Feito para desenvolvedores, não para acionistas."
  },
  fr: {
    uploadTab: "Télécharger Fichier", pasteTab: "Coller le Code", optimizeBtn: "Nettoyer le Code",
    analyzingPdf: "L'IA documente votre code...",
    extractingConcepts: "ajout de commentaires et structure propre",
    uploadPdf: "Télécharger Fichier Code",
    uploadAnother: "Nettoyer un Autre Code",
    uploadNow: "Nettoyer le Code Maintenant",
    dropPdf: "Déposez votre code source ici",
    browseFiles: "Parcourir",
    analyzing: "L'IA analyse votre code…",
    summaryReady: "Votre code documenté est prêt",
    unlockFull: "Débloquer le Code et Obtenir 100 Crédits pour 1 $",
    useCredit: "Utiliser 1 Crédit (Restant : ",
    remainingCredits: "Crédits restants : ",
    copy: "Copier le Code",
    copied: "Copié !",
    exportPdf: "Exporter PDF",
    activeCreditsHint: "Vous avez des crédits actifs. Débloquez votre code instantanément !",
    noCreditsHint: "Débloquez le code documenté et obtenez 100 crédits à vie.",
    importantNote: "⚠️ **Note Importante :** Vous pouvez utiliser le service sans compte, mais n'effacez pas les données de votre navigateur.",
    badge: "Conçu pour les développeurs · 100 crédits pour 1 $",
    heroTitle1: "Nettoyez et Documentez",
    heroTitle2: "Votre Code",
    heroTitle3: "en quelques Secondes",
    heroSubtitle1: "Payez ",
    heroSubtitle2: "1 $ une fois",
    heroSubtitle3: ". Obtenez ",
    heroSubtitle4: "100 générations de code propre",
    heroSubtitle5: " pour toujours. Zéro abonnement mensuel.",
    secureTry: "Sécurisé · Sans inscription pour essayer",
    dropzoneHint: "ou cliquez pour parcourir · fichiers sources jusqu'à 50 Mo",
    card1Title: "Prêt pour la Production",
    card1Desc: "Formate votre code brut avec des commentaires standard et une architecture propre.",
    card2Title: "Crédits à Vie",
    card2Desc: "Vos 100 crédits n'expirent jamais. Utilisez-les pour vos futurs projets.",
    card3Title: "Pas d'Abonnement",
    card3Desc: "Paiement unique de 1 $. Plus jamais de facturation mensuelle.",
    footer: "© 2026 CodePing · Fait pour les développeurs, pas pour les actionnaires."
  },
  hi: {
    uploadTab: "फ़ाइल अपलोड करें", pasteTab: "कोड पेस्ट करें", optimizeBtn: "कोड साफ़ करें",
    analyzingPdf: "AI आपके कोड का दस्तावेजीकरण कर रहा है...",
    extractingConcepts: "टिप्पणियाँ और स्पष्ट संरचना जोड़ रहा है",
    uploadPdf: "कोड फ़ाइल अपलोड करें",
    uploadAnother: "अन्य कोड साफ़ करें",
    uploadNow: "अभी कोड साफ़ करें",
    dropPdf: "अपना स्रोत कोड यहाँ छोड़ें",
    browseFiles: "फ़ाइलें ब्राउज़ करें",
    analyzing: "AI आपके कोड का विश्लेषण कर रहा है…",
    summaryReady: "आपका दस्तावेजीकृत कोड तैयार है",
    unlockFull: "कोड अनलॉक करें और $1 में 100 क्रेडिट प्राप्त करें",
    useCredit: "1 क्रेडिट का उपयोग करें (शेष: ",
    remainingCredits: "शेष क्रेडिट: ",
    copy: "कोड कॉपी करें",
    copied: "कॉपी किया गया!",
    exportPdf: "PDF निर्यात करें",
    activeCreditsHint: "आपके पास सक्रिय क्रेडिट हैं। अपना कोड तुरंत अनलॉक करें!",
    noCreditsHint: "दस्तावेजीकृत कोड को अनलॉक करें और 100 आजीवन क्रेडिट प्राप्त करें।",
    importantNote: "⚠️ **महत्वपूर्ण नोट:** आप बिना खाते के सेवा का उपयोग कर सकते हैं, लेकिन कृपया अपने क्रेडिट खोने से बचने के लिए अपने ब्राउज़र डेटा को साफ़ न करें।",
    badge: "डेवलपर्स के लिए · $1 में 100 क्रेडिट",
    heroTitle1: "साफ़ और दस्तावेज़ीकरण",
    heroTitle2: "आपका कोड",
    heroTitle3: "कुछ ही सेकंड में",
    heroSubtitle1: "",
    heroSubtitle2: "$1 का एक बार",
    heroSubtitle3: " भुगतान करें। हमेशा के लिए ",
    heroSubtitle4: "100 साफ़ कोड पीढ़ियाँ",
    heroSubtitle5: " प्राप्त करें। कोई मासिक सदस्यता नहीं।",
    secureTry: "सुरक्षित · आज़माने के लिए कोई साइनअप नहीं",
    dropzoneHint: "या ब्राउज़ करने के लिए टैप करें · स्रोत फ़ाइलें 50 MB तक",
    card1Title: "उत्पादन के लिए तैयार",
    card1Desc: "आपके कच्चे कोड को मानक टिप्पणियों और स्पष्ट वास्तुकला के साथ प्रारूपित करता है।",
    card2Title: "आजीवन क्रेडिट",
    card2Desc: "आपके 100 क्रेडिट कभी समाप्त नहीं होते। भविष्य की परियोजनाओं के लिए उनका उपयोग करें।",
    card3Title: "कोई सदस्यता नहीं",
    card3Desc: "एक बार का $1 भुगतान। फिर कभी मासिक शुल्क नहीं लगेगा।",
    footer: "© 2026 CodePing · शेयरधारकों के लिए नहीं, डेवलपर्स के लिए बनाया गया।"
  },
  zh: {
    uploadTab: "上传文件", pasteTab: "粘贴代码", optimizeBtn: "清理代码",
    analyzingPdf: "AI 正在记录您的代码...",
    extractingConcepts: "正在添加标准注释和清晰结构",
    uploadPdf: "上传代码文件",
    uploadAnother: "清理其他代码",
    uploadNow: "立即清理代码",
    dropPdf: "将源代码拖放到此处",
    browseFiles: "浏览文件",
    analyzing: "AI 正在分析您的代码…",
    summaryReady: "您的代码文档已准备就绪",
    unlockFull: "只需 1 美元即可解锁代码并获得 100 个积分",
    useCredit: "使用 1 个积分 (剩余: ",
    remainingCredits: "剩余积分: ",
    copy: "复制代码",
    copied: "已复制!",
    exportPdf: "导出 PDF",
    activeCreditsHint: "您有可用积分。立即解锁您的代码！",
    noCreditsHint: "解锁已记录的代码，获得100个终身积分。",
    importantNote: "⚠️ **重要提示：** 您可以在没有帐户的情况下使用该服务，但请不要清除浏览器数据以免丢失积分。",
    badge: "专为开发者打造 · 1美元获取100个积分",
    heroTitle1: "清理与记录",
    heroTitle2: "您的代码",
    heroTitle3: "只需几秒钟",
    heroSubtitle1: "只需",
    heroSubtitle2: "支付 1 美元",
    heroSubtitle3: "。永久获取 ",
    heroSubtitle4: "100 次干净的代码生成",
    heroSubtitle5: "。零月度订阅。",
    secureTry: "安全 · 免费试用，无需注册",
    dropzoneHint: "或点击浏览 · 源代码文件最大 50 MB",
    card1Title: "生产就绪",
    card1Desc: "使用标准注释和清晰架构格式化您的原始代码。",
    card2Title: "终身积分",
    card2Desc: "您的 100 个积分永不过期。留作日后项目使用。",
    card3Title: "无订阅费",
    card3Desc: "一次性支付 1 美元。再也不会有每月扣费。",
    footer: "© 2026 CodePing · 为开发者而非股东打造。"
  }
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodePing — Clean & Document Your Code in Seconds" },
      {
        name: "description",
        content:
          "Pay $1 once. Get 100 AI code documentations forever. Built for developers. No subscriptions.",
      },
      { property: "og:title", content: "CodePing — AI Code Cleaner & Documenter" },
      {
        property: "og:description",
        content: "Pay $1 once. 100 lifetime code documentations. No monthly fees.",
      },
    ],
  }),
  component: LandingPage,
});

const createCheckout = createServerFn({ method: "POST" }).handler(async () => {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "100 Code Documentations",
            description: "Unlock production-grade code documentation and formatting.",
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://codeping.dollarfix.net/?success=true",
    cancel_url: "https://codeping.dollarfix.net",
  });

  return session.url;
});

const generateSummary = createServerFn({ method: "POST" })
  .validator((data: { base64Data: string; mimeType: string; targetLanguage: string }) => data)
  .handler(async ({ data }) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prompt مخصص للمبرمجين وتوثيق الأكواد
    const prompt = `You are an expert Senior Software Engineer. I have provided a raw code snippet or file. 
    Your task is to thoroughly clean, document, and structure this code for a production-level environment.
    
    Follow these strict rules:
    1. Add professional, standard inline comments explaining complex logic.
    2. Add a brief block comment at the top explaining what the code does overall.
    3. Format the code according to best practices for its specific programming language (indentation, spacing).
    4. DO NOT change the core logic, functionality, or variable names unnecessarily unless they are completely unreadable.
    5. Wrap the final output beautifully using standard Markdown with the appropriate language tag (e.g., \`\`\`javascript ... \`\`\`).
    6. IMPORTANT: Write all comments and documentation EXCLUSIVELY in ${data.targetLanguage}. Keep the actual programming syntax and code in English.
    7. CRITICAL: DO NOT output any conversational text, introductions, or explanations (e.g., do not say "Here is your code"). Start immediately with the markdown code block.`;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: data.base64Data,
          mimeType: data.mimeType,
        },
      },
    ]);

    return result.response.text();
  });

type AppState = "idle" | "processing" | "locked" | "unlocked";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export type HistoryItem = {
  id: string;
  fileName: string;
  summary: string;
  date: number;
};

const saveToHistory = async (fileName: string, summary: string) => {
  try {
    const currentHistory: HistoryItem[] = (await get("codeping_history")) || [];
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      fileName,
      summary,
      date: Date.now(),
    };
    
    let updatedHistory = [newItem, ...currentHistory];
    
    if (updatedHistory.length > 15) {
      updatedHistory = updatedHistory.slice(0, 15);
    }
    
    await set("codeping_history", updatedHistory);
  } catch (error) {
    console.error("Error saving to history:", error);
  }
};

function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [state, setState] = useState<AppState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem("codeping_language") : null;
    return (savedLang as Language) || "en";
  });
  
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [pastedText, setPastedText] = useState("");

  useEffect(() => {
    localStorage.setItem("codeping_language", language);
  }, [language]);

  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const storedCredits = localStorage.getItem('codeping_credits');
    if (storedCredits !== null) {
      setUserCredits(parseInt(storedCredits, 10));
    } else {
      setUserCredits(0);
    }
  }, []);

  const runAIProcessing = async (file: File) => {
    setState("processing");
    try {
      const base64 = await fileToBase64(file);
      const resultText = await generateSummary({ 
        data: { 
          base64Data: base64, 
          mimeType: file.type || "text/plain",
          targetLanguage: languageNames[language] 
        } 
      });
      
      setUserCredits(prev => {
        if (prev !== null && prev > 0) {
          const newCredits = prev - 1;
          localStorage.setItem("codeping_credits", newCredits.toString()); 
          return newCredits;
        }
        return prev;
      });

      setSummaryResult(resultText);
      await saveToHistory(file.name, resultText);
      setState("unlocked");
    } catch (error) {
      console.error("AI Error:", error);
      alert("An error occurred during processing. Please try again.");
      setState("idle");
    }
  };

  useEffect(() => {
    const processPaidDocument = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      
      if (urlParams.get("success") === "true") {
        const savedPdf = await get("pending_pdf");
        
        if (savedPdf) {
          const file = savedPdf as File;
          setPdfFile(file);
          setFileName(file.name);
          
          localStorage.setItem("codeping_credits", "100");
          window.history.replaceState({}, document.title, "/");
          
          await runAIProcessing(file);
        }
      }
    };

    processPaidDocument();
  }, []);

  const startProcessing = useCallback((file: File) => {
    setFileName(file.name);
    setPdfFile(file); 
    setState("processing");
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / 2200) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else setTimeout(() => setState("locked"), 250);
    };
    requestAnimationFrame(tick);
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    startProcessing(f);
  };

  const handleUploadAction = () => {
    setState("idle");
    setFileName(null);
    setPdfFile(null);
    setSummaryResult(null);
    setProgress(0);
    appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      inputRef.current?.click();
    }, 100);
  };

  const handleTextSubmit = () => {
    if (!pastedText.trim()) return;
    setFileName("Pasted Code Snippet");
    
    const virtualFile = new File([pastedText], "code.txt", { type: "text/plain" });
    setPdfFile(virtualFile); 
    
    setState("processing");
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / 2200) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else setTimeout(() => setState("locked"), 250);
    };
    requestAnimationFrame(tick);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-semibold tracking-tight">
              CodePing
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative inline-flex items-center mr-2">
              <Globe className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="h-9 appearance-none rounded-md border border-border bg-transparent dark:bg-background pl-9 pr-6 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                dir="ltr"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="fr">Français</option>
                <option value="hi">हिन्दी</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:bg-accent mr-1"
              aria-label="View History"
            >
              <History className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:bg-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleUploadAction}
              className="rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover sm:px-4"
            >
              {state === "idle" ? translations[language].uploadPdf : translations[language].uploadAnother}
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[480px] bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]"
        />
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pb-16 sm:pt-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
           {translations[language].badge}
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {translations[language].heroTitle1}{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.62_0.18_200)] bg-clip-text text-transparent">
              {translations[language].heroTitle2}
            </span>{" "}
            {translations[language].heroTitle3}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {translations[language].heroSubtitle1}
          <span className="font-semibold text-foreground">{translations[language].heroSubtitle2}</span>
          {translations[language].heroSubtitle3}
          <span className="font-semibold text-foreground">{translations[language].heroSubtitle4}</span>
          {translations[language].heroSubtitle5}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={handleUploadAction}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-hover sm:w-auto"
            >
              <Upload className="h-5 w-5" />
              {state === "idle" ? translations[language].uploadNow : translations[language].uploadAnother}
            </button>
            
            {userCredits !== null && userCredits > 0 ? (
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary shadow-soft animate-fade-in">
                <Zap className="h-4 w-4" />
                <span>{translations[language].remainingCredits}{userCredits}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                {translations[language].secureTry}
              </div>
            )}
          </div>
        </div>
      </section>

      <section ref={appRef} className="px-4 pb-12 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
            {state === "idle" && (
              <IdleZone
                language={language}
                userCredits={userCredits}
                dragOver={dragOver}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onBrowse={() => inputRef.current?.click()}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pastedText={pastedText}
                setPastedText={setPastedText}
                onProcessText={handleTextSubmit}
              />
            )}

            {state === "processing" && <ProcessingState language={language} fileName={fileName} progress={progress} />}

            {state === "locked" && (
              <LockedResult 
                language={language} 
                fileName={fileName} 
                pdfFile={pdfFile} 
                onUseCredit={() => pdfFile && runAIProcessing(pdfFile)} 
                onCreditSpent={() => setUserCredits(prev => prev !== null && prev > 0 ? prev - 1 : prev)} 
              />
            )}
            {state === "unlocked" && <UnlockedResult language={language} summary={summaryResult} fileName={fileName} />}

            <input
              ref={inputRef}
              type="file"
              accept=".js,.ts,.py,.html,.css,.json,.txt,.jsx,.tsx,.cpp,.c,.java,.php"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {state !== "idle" && (
            <div className="mt-8 text-center">
              <button
                onClick={handleUploadAction}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition hover:bg-muted/50 hover:border-primary/30"
              >
                ← {translations[language].uploadAnother}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-surface px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          <ValueProp
            icon={<Zap className="h-5 w-5" />}
            title={translations[language].card1Title}
            desc={translations[language].card1Desc}
          />
          <ValueProp
            icon={<InfinityIcon className="h-5 w-5" />}
            title={translations[language].card2Title}
            desc={translations[language].card2Desc}
          />
          <ValueProp
            icon={<Ban className="h-5 w-5" />}
            title={translations[language].card3Title}
            desc={translations[language].card3Desc}
          />
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        {translations[language].footer}
      </footer>

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelect={(item) => {
          setFileName(item.fileName);
          setSummaryResult(item.summary);
          setState("unlocked"); 
          setIsHistoryOpen(false); 
          appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); 
        }}
      />
    </div>
  );
}

function IdleZone({
  language,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowse,
  userCredits,
  activeTab,
  setActiveTab,
  pastedText,
  setPastedText,
  onProcessText
}: {
  language: Language;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: () => void;
  userCredits: number | null;
  activeTab: "upload" | "paste";
  setActiveTab: (tab: "upload" | "paste") => void;
  pastedText: string;
  setPastedText: (text: string) => void;
  onProcessText: () => void;
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex p-1 mb-6 rounded-lg bg-muted/50 border border-border w-full max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === "upload" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="h-4 w-4" /> {translations[language].uploadTab}
        </button>
        <button
          onClick={() => setActiveTab("paste")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === "paste" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code2 className="h-4 w-4" /> {translations[language].pasteTab}
        </button>
      </div>

      {activeTab === "upload" ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-12 text-center transition sm:py-16 animate-fade-in ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border bg-surface hover:border-primary/50"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <p className="text-base font-semibold">{translations[language].dropPdf}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {translations[language].dropzoneHint}
            </p>
          </div>
          <button
            onClick={onBrowse}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            <Upload className="h-4 w-4" />
            {translations[language].browseFiles}
          </button>
          
          {userCredits !== null && userCredits > 0 && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-soft animate-fade-in">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>{translations[language].remainingCredits}{userCredits}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col animate-fade-in w-full">
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="const hello = () => { console.log('Paste your raw code here...'); }"
            className="w-full min-h-[280px] p-4 font-mono text-sm bg-surface border border-border rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={onProcessText}
            disabled={pastedText.trim().length === 0}
            className="mt-4 mx-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
          >
            <Sparkles className="h-4 w-4" />
            {translations[language].optimizeBtn}
          </button>
        </div>
      )}
    </div>
  );
}

function ProcessingState({
  language,
  fileName,
  progress,
}: {
  language: Language;
  fileName: string | null;
  progress: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-4 py-12 text-center sm:py-16">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
      <div>
        <p className="text-base font-semibold">{translations[language].analyzingPdf}</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {fileName ?? "your-code.js"} · {translations[language].extractingConcepts}
        </p>
      </div>
      <div className="w-full max-w-sm">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.62_0.18_200)] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

function LockedResult({
  language,
  fileName,
  pdfFile,
  onUseCredit,
  onCreditSpent,
}: {
  language: Language;
  fileName: string | null;
  pdfFile: File | null;
  onUseCredit: () => void;
  onCreditSpent: () => void;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const savedCredits = localStorage.getItem("codeping_credits");
    if (savedCredits) {
      setCredits(parseInt(savedCredits, 10));
    }
  }, []);

  const handleAction = async () => {
    if (!pdfFile) return;

    if (credits > 0) {
      onUseCredit();
    } else {
      try {
        setIsRedirecting(true);
        await set("pending_pdf", pdfFile);
        const url = await createCheckout();
        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        console.error("Payment error:", error);
        setIsRedirecting(false);
      }
    }
  };

  return (
    <div className="relative">
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span>Documented code ready for {fileName ?? "your-code.js"}</span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-surface min-h-[350px]">
        <div
          aria-hidden
          className="space-y-3 p-6 font-mono text-sm leading-relaxed text-foreground/90 select-none"
          style={{ filter: "blur(6px)" }}
        >
          <p className="text-primary">/**</p>
          <p className="text-primary"> * This function processes the input data array.</p>
          <p className="text-primary"> */</p>
          <p>const processData = (items) =&#62; &#123;</p>
          <p>  return items.map(item =&#62; item.value);</p>
          <p>&#125;;</p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/40 via-background/80 to-background p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 text-center shadow-glow sm:p-6">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              {credits > 0 ? <Zap className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
            </div>
            
            <h3 className="text-lg font-semibold tracking-tight">
              {translations[language].summaryReady}
            </h3>
            
            <p className="mt-1 text-sm text-muted-foreground">
          {credits > 0
            ? translations[language].activeCreditsHint
            : translations[language].noCreditsHint}
        </p>

            <button
              onClick={handleAction}
              disabled={isRedirecting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRedirecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : credits > 0 ? (
                <Zap className="h-4 w-4" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              {isRedirecting
                ? "Saving Code & Redirecting..."
                : credits > 0
                ? `${translations[language].useCredit}${credits})`
                : translations[language].unlockFull}
            </button>

            {credits > 0 ? (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200 text-center text-balance">
                {translations[language].importantNote}
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Secure payment · One-time · No subscription
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueProp({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="font-display text-base font-semibold tracking-tight">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function UnlockedResult({ language, summary, fileName }: { language: Language; summary: string | null; fileName: string | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative print-container">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-container, .print-container * { visibility: visible; }
          .print-container { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <span>Clean code ready for {fileName ?? "your-code.js"}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted/50"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? translations[language].copied : translations[language].copy}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted/50"
          >
            <Printer className="h-3.5 w-3.5" />
            {translations[language].exportPdf}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap shadow-soft">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2 text-primary" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-5 mb-2 border-b border-border pb-1" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-3 mb-1" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
            li: ({ node, ...props }) => <li className="text-foreground/90" {...props} />,
            p: ({ node, ...props }) => <p className="mb-3 text-foreground/90 leading-relaxed" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-bold text-foreground" {...props} />,
            code: ({ node, ...props }) => <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-[13px]" {...props} />,
            pre: ({ node, ...props }) => <pre className="bg-muted/50 p-4 rounded-xl overflow-x-auto border border-border font-mono text-[13px] my-4" {...props} />
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function HistoryDrawer({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
}) {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      get("codeping_history").then((data) => {
        if (data) setHistoryList(data);
      });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}
      
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <History className="h-5 w-5 text-primary" />
            Code History
          </h2>
          <button 
            onClick={onClose} 
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex max-h-[calc(100vh-100px)] flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {historyList.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center text-center text-muted-foreground">
              <History className="mb-3 h-8 w-8 opacity-20" />
              <p className="text-sm">No code history yet.</p>
            </div>
          ) : (
            historyList.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="group flex flex-col items-start rounded-xl border border-border bg-surface p-4 text-left transition hover:border-primary/50 hover:bg-primary/5"
              >
                <span className="w-full truncate text-sm font-semibold text-foreground group-hover:text-primary">
                  {item.fileName}
                </span>
                <span className="mt-1.5 text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}