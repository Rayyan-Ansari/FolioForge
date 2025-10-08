import React, { useState,  } from 'react';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    bio: '',
    skills: '',
    projects: '',
    contact: ''
  });
  const [generatedPortfolio, setGeneratedPortfolio] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('neon');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const themes = [
    { 
      id: 'neon', 
      name: 'Neon Pulse', 
      bg: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900', 
      accent: 'text-cyan-400', 
      button: 'bg-gradient-to-r from-cyan-500 to-purple-500',
      icon: '⚡'
    },
    { 
      id: 'glass', 
      name: 'Glass Morphism', 
      bg: 'bg-gradient-to-br from-slate-800 via-purple-800 to-slate-900', 
      accent: 'text-pink-400', 
      button: 'bg-gradient-to-r from-pink-500 to-violet-500',
      icon: '🫧'
    },
    { 
      id: 'cyber', 
      name: 'Cyber Grid', 
      bg: 'bg-gradient-to-br from-green-900 via-black to-gray-900', 
      accent: 'text-green-400', 
      button: 'bg-gradient-to-r from-green-500 to-emerald-500',
      icon: '🌐'
    },
    { 
      id: 'hologram', 
      name: 'Holographic', 
      bg: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900', 
      accent: 'text-yellow-400', 
      button: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      icon: '🌈'
    },
    { 
      id: 'quantum', 
      name: 'Quantum Flux', 
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900', 
      accent: 'text-blue-400', 
      button: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      icon: '🌀'
    },
    { 
      id: 'stellar', 
      name: 'Stellar', 
      bg: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black', 
      accent: 'text-purple-400', 
      button: 'bg-gradient-to-r from-purple-500 to-pink-500',
      icon: '⭐'
    }
  ];

  const currentTheme = themes.find(t => t.id === selectedTheme);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const autoFillForm = () => {
    const defaults = {
      name: 'Alex Rivera',
      profession: 'Full-Stack Developer & AI Engineer',
      bio: 'Passionate about building futuristic web experiences with cutting-edge technologies. I specialize in AI-powered applications, full-stack development, and creating stunning user interfaces that push the boundaries of what\'s possible.',
      skills: 'React, Next.js, AI Integration, TypeScript, Node.js, Python, Machine Learning, UI/UX Design',
      projects: 'AI Portfolio Generator - A revolutionary tool that creates stunning portfolios in seconds using artificial intelligence.\n\nFutureWeb Studio - A design system for futuristic web applications with advanced animations and AI capabilities.\n\nNeural Dashboard - Real-time analytics platform powered by machine learning algorithms.',
      contact: 'alex.rivera@email.com | @alex_rivera_dev | github.com/alexrivera'
    };
    setFormData(defaults);
  };

  const generatePortfolio = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const portfolioData = {
      name: formData.name || 'Alex Rivera',
      profession: formData.profession || 'Full-Stack Developer & AI Engineer',
      bio: formData.bio || 'Passionate about building futuristic web experiences with cutting-edge technologies. I specialize in AI-powered applications, full-stack development, and creating stunning user interfaces that push the boundaries of what\'s possible.',
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['React', 'Next.js', 'AI Integration', 'TypeScript', 'Node.js'],
      projects: formData.projects ? formData.projects.split('\n\n').map(p => {
        const lines = p.split('\n');
        return { title: lines[0], description: lines.slice(1).join(' ') || 'Innovative project leveraging advanced technologies' };
      }) : [
        { title: 'AI Portfolio Generator', description: 'A revolutionary tool that creates stunning portfolios in seconds using artificial intelligence.' },
        { title: 'FutureWeb Studio', description: 'A design system for futuristic web applications with advanced animations and AI capabilities.' },
        { title: 'Neural Dashboard', description: 'Real-time analytics platform powered by machine learning algorithms.' }
      ],
      experience: [
        { company: 'NeuralTech', role: 'Senior AI Developer', period: '2022-Present', description: 'Leading AI integration projects and developing next-generation web applications.' },
        { company: 'FutureLabs', role: 'Full-Stack Engineer', period: '2020-2022', description: 'Built scalable web applications with focus on performance and user experience.' }
      ],
      education: [
        { degree: 'MSc Computer Science', school: 'Tech University', year: '2020' },
        { degree: 'BSc Software Engineering', school: 'Innovation Institute', year: '2018' }
      ],
      contact: formData.contact || 'alex.rivera@email.com | @alex_rivera_dev | github.com/alexrivera'
    };

    setGeneratedPortfolio(portfolioData);
    setStep(3);
    setIsGenerating(false);
    setDownloadError('');
  };

  const downloadPortfolio = () => {
    try {
      setDownloadError('');
      
      if (!generatedPortfolio) {
        setDownloadError('No portfolio data available to download');
        return;
      }

      // Create the HTML content
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${generatedPortfolio.name} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Space Grotesk', sans-serif; }
        .animate-pulse-fast { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        .glow { text-shadow: 0 0 10px rgba(0, 255, 255, 0.7); }
    </style>
</head>
<body class="${currentTheme.bg} min-h-screen text-white">
    <div class="container mx-auto px-6 py-12 max-w-6xl">
        <!-- Header -->
        <header class="text-center mb-16">
            <h1 class="text-5xl md:text-7xl font-bold mb-4">${generatedPortfolio.name}</h1>
            <p class="text-xl md:text-2xl ${currentTheme.accent} font-medium">${generatedPortfolio.profession}</p>
        </header>

        <!-- About -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">About Me</h2>
            <p class="text-lg leading-relaxed">${generatedPortfolio.bio}</p>
        </section>

        <!-- Skills -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Skills</h2>
            <div class="flex flex-wrap gap-3">
                ${generatedPortfolio.skills.map(skill => `<span class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30">${skill}</span>`).join('')}
            </div>
        </section>

        <!-- Projects -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Projects</h2>
            <div class="grid md:grid-cols-2 gap-8">
                ${generatedPortfolio.projects.map(project => `
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                    <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                    <p>${project.description}</p>
                </div>
                `).join('')}
            </div>
        </section>

        <!-- Experience -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Experience</h2>
            <div class="space-y-6">
                ${generatedPortfolio.experience.map(exp => `
                <div class="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20">
                    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h3 class="text-xl font-bold">${exp.role}</h3>
                        <span class="${currentTheme.accent} font-medium">${exp.period}</span>
                    </div>
                    <p class="font-medium">${exp.company}</p>
                    <p class="mt-2">${exp.description}</p>
                </div>
                `).join('')}
            </div>
        </section>

        <!-- Education -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Education</h2>
            <div class="space-y-4">
                ${generatedPortfolio.education.map(edu => `
                <div class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/20">
                    <div class="flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold">${edu.degree}</span>
                        <span class="${currentTheme.accent}">${edu.year}</span>
                    </div>
                    <p>${edu.school}</p>
                </div>
                `).join('')}
            </div>
        </section>

        <!-- Contact -->
        <section>
            <h2 class="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Contact Me</h2>
            <p class="text-lg">${generatedPortfolio.contact}</p>
            <div class="mt-8 text-center">
                <p class="text-sm opacity-70">Generated with FolioForge • ${new Date().getFullYear()}</p>
            </div>
        </section>
    </div>
</body>
</html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedPortfolio.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError('Failed to download portfolio. Please try again.');
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-20">
            <div className="text-3xl font-bold">
              <span className="text-cyan-400">Folio</span>Forge
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-cyan-400 transition-colors duration-200">Features</a>
              <a href="#demo" className="hover:text-cyan-400 transition-colors duration-200">Demo</a>
              <a href="#themes" className="hover:text-cyan-400 transition-colors duration-200">Themes</a>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Forge Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                AI Portfolio
              </span>
              in Seconds
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
              Create a stunning, futuristic portfolio website instantly with AI. No login, no setup, just pure innovation.
            </p>
            <button
              onClick={() => setStep(2)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold text-xl px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
            >
              Forge My Portfolio Now
            </button>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Generation</h3>
              <p className="opacity-80">Create your professional portfolio in under a minute with AI-powered generation.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Futuristic Templates</h3>
              <p className="opacity-80">Choose from multiple cutting-edge designs that showcase your work in the most modern way.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">No Login Required</h3>
              <p className="opacity-80">100% anonymous and instant use. No personal information needed to get started.</p>
            </div>
          </div>

          {/* Demo Section */}
          <div id="demo" className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">See It In Action</h2>
            <div className="bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-cyan-500/30 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="h-4 bg-cyan-500/20 rounded animate-pulse"></div>
                    <div className="h-4 bg-purple-500/20 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="h-4 bg-pink-500/20 rounded w-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-yellow-500/20 rounded w-5/6 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="h-4 bg-green-500/20 rounded w-2/3 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="h-4 bg-blue-500/20 rounded w-3/4 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Themes Section */}
          <div id="themes" className="text-center">
            <h2 className="text-4xl font-bold mb-8">Futuristic Themes</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {themes.slice(0, 3).map((theme) => (
                <div key={theme.id} className={`${theme.bg} p-8 rounded-xl border border-cyan-500/30`}>
                  <div className="text-6xl mb-4">{theme.icon}</div>
                  <h3 className="text-xl font-bold">{theme.name}</h3>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-6">
              {themes.slice(3, 6).map((theme) => (
                <div key={theme.id} className={`${theme.bg} p-8 rounded-xl border border-cyan-500/30`}>
                  <div className="text-6xl mb-4">{theme.icon}</div>
                  <h3 className="text-xl font-bold">{theme.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <button
            onClick={() => setStep(1)}
            className="mb-8 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">AI Portfolio</span>
            </h1>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="e.g., Alex Rivera"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="e.g., Full-Stack Developer & AI Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="Tell us about yourself and your expertise..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="e.g., React, Next.js, AI Integration, TypeScript"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Projects (one per line)</label>
                <textarea
                  value={formData.projects}
                  onChange={(e) => handleInputChange('projects', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="Project 1 - Description of your amazing project
Project 2 - Another impressive accomplishment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Information</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="e.g., email@example.com | @username | github.com/username"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={autoFillForm}
                  className="flex-1 px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors duration-200"
                >
                  Auto-fill with AI
                </button>
                <button
                  onClick={generatePortfolio}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Forging...
                    </>
                  ) : (
                    'Forge Portfolio'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3 && generatedPortfolio) {
    return (
      <div className="min-h-screen">
        {/* Portfolio Preview */}
        <div className={`${currentTheme.bg} min-h-screen text-white`}>
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-16">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">{generatedPortfolio.name}</h1>
                <p className={`text-xl md:text-2xl ${currentTheme.accent} font-medium`}>{generatedPortfolio.profession}</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 md:mt-0">
                <button
                  onClick={downloadPortfolio}
                  className={`${currentTheme.button} text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download HTML
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
            </header>

            {/* Error Message */}
            {downloadError && (
              <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-center">{downloadError}</p>
              </div>
            )}

            {/* About */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">About Me</h2>
              <p className="text-lg leading-relaxed">{generatedPortfolio.bio}</p>
            </section>

            {/* Skills */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {generatedPortfolio.skills.map((skill, index) => (
                  <span key={index} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {generatedPortfolio.projects.map((project, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Experience</h2>
              <div className="space-y-6">
                {generatedPortfolio.experience.map((exp, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <span className={`${currentTheme.accent} font-medium`}>{exp.period}</span>
                    </div>
                    <p className="font-medium">{exp.company}</p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Education</h2>
              <div className="space-y-4">
                {generatedPortfolio.education.map((edu, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/20">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <span className="font-bold">{edu.degree}</span>
                      <span className={`${currentTheme.accent}`}>{edu.year}</span>
                    </div>
                    <p>{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold mb-6 border-b border-cyan-500 inline-block">Contact Me</h2>
              <p className="text-lg">{generatedPortfolio.contact}</p>
              <div className="mt-8 text-center">
                <p className="text-sm opacity-70">Generated with FolioForge • {new Date().getFullYear()}</p>
              </div>
            </section>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="fixed bottom-6 left-6 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-cyan-500/20">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Themes
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-2 rounded-lg text-xs transition-all duration-200 flex items-center space-x-2 ${
                  selectedTheme === theme.id 
                    ? 'bg-white/20 border-2 border-cyan-400' 
                    : 'hover:bg-white/10 border border-white/20'
                }`}
                title={theme.name}
              >
                <span className="text-sm">{theme.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;