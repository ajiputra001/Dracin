import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import SearchModal from './components/SearchModal';

import HomeView from './views/HomeView';
import DetailView from './views/DetailView';
import PlayerView from './views/PlayerView';
import VipView from './views/VipView';
import DaftarkuView from './views/DaftarkuView';
import RiwayatView from './views/RiwayatView';
import GlobalChatView from './views/GlobalChatView';
import ProfileView from './views/ProfileView';
import ApiStatusView from './views/ApiStatusView';
import PrivacyView from './views/PrivacyView';

import { MOCK_DRAMAS } from './data/mockDramas';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedDrama, setSelectedDrama] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [activeProvider, setActiveProvider] = useState('dramabox');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // LocalStorage state for Daftarku (Saved Bookmarks)
  const [daftarkuIds, setDaftarkuIds] = useState(() => {
    try {
      const saved = localStorage.getItem('sdracin_daftarku');
      return saved ? JSON.parse(saved) : ["dr-01", "dr-02"];
    } catch {
      return ["dr-01", "dr-02"];
    }
  });

  // LocalStorage state for Watch History
  const [watchHistory, setWatchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('sdracin_history');
      return saved ? JSON.parse(saved) : [
        { dramaId: "dr-01", lastEpisode: 5, timestamp: Date.now() - 3600000 },
        { dramaId: "dr-04", lastEpisode: 12, timestamp: Date.now() - 86400000 }
      ];
    } catch {
      return [];
    }
  });

  // LocalStorage state for User Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('sdracin_user');
      return saved ? JSON.parse(saved) : {
        name: 'Palevi Fan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop'
      };
    } catch {
      return {
        name: 'Palevi Fan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop'
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('sdracin_daftarku', JSON.stringify(daftarkuIds));
  }, [daftarkuIds]);

  useEffect(() => {
    localStorage.setItem('sdracin_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem('sdracin_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Handlers
  const handleToggleDaftarku = (dramaId) => {
    setDaftarkuIds(prev => 
      prev.includes(dramaId) ? prev.filter(id => id !== dramaId) : [...prev, dramaId]
    );
  };

  const handleSaveHistory = (dramaId, episodeNumber) => {
    setWatchHistory(prev => {
      const filtered = prev.filter(h => h.dramaId !== dramaId);
      return [{ dramaId, lastEpisode: episodeNumber, timestamp: Date.now() }, ...filtered];
    });
  };

  const handleClearHistory = () => {
    setWatchHistory([]);
  };

  const handleSelectDrama = (drama, episodeNum = 1) => {
    setSelectedDrama(drama);
    setSelectedEpisode(episodeNum);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayEpisode = (drama, episodeNum) => {
    setSelectedDrama(drama);
    setSelectedEpisode(episodeNum);
    setCurrentView('player');
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans relative">
      
      {/* Top App Header (Hidden in Fullscreen Player) */}
      {currentView !== 'player' && (
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenVip={() => setCurrentView('vip')}
          onOpenApiStatus={() => setCurrentView('apistatus')}
          activeProvider={activeProvider}
          onSelectProvider={(p) => {
            setActiveProvider(p);
            if (p === 'melolo') setCurrentView('melolo');
            else setCurrentView('home');
          }}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-4 pb-12">
        {currentView === 'home' && (
          <HomeView
            dramas={MOCK_DRAMAS}
            onSelectDrama={handleSelectDrama}
            daftarkuIds={daftarkuIds}
            onToggleDaftarku={handleToggleDaftarku}
            watchHistory={watchHistory}
            activeProvider={activeProvider}
            onOpenVip={() => setCurrentView('vip')}
          />
        )}

        {currentView === 'melolo' && (
          <HomeView
            dramas={MOCK_DRAMAS.filter(d => d.provider === 'Melolo' || d.category === 'melolo')}
            onSelectDrama={handleSelectDrama}
            daftarkuIds={daftarkuIds}
            onToggleDaftarku={handleToggleDaftarku}
            watchHistory={watchHistory}
            activeProvider="melolo"
            onOpenVip={() => setCurrentView('vip')}
          />
        )}

        {currentView === 'detail' && selectedDrama && (
          <DetailView
            drama={selectedDrama}
            onBack={() => setCurrentView('home')}
            onPlayEpisode={handlePlayEpisode}
            isSaved={daftarkuIds.includes(selectedDrama.id)}
            onToggleDaftarku={handleToggleDaftarku}
            watchHistory={watchHistory}
          />
        )}

        {currentView === 'player' && selectedDrama && (
          <PlayerView
            drama={selectedDrama}
            episodeNumber={selectedEpisode}
            onBack={() => setCurrentView('detail')}
            onSelectEpisode={(d, ep) => {
              setSelectedEpisode(ep);
              handleSaveHistory(d.id, ep);
            }}
            onSaveHistory={handleSaveHistory}
          />
        )}

        {currentView === 'vip' && (
          <VipView onExploreDramas={() => setCurrentView('home')} />
        )}

        {currentView === 'daftarku' && (
          <DaftarkuView
            dramas={MOCK_DRAMAS}
            daftarkuIds={daftarkuIds}
            onToggleDaftarku={handleToggleDaftarku}
            onSelectDrama={handleSelectDrama}
          />
        )}

        {currentView === 'riwayat' && (
          <RiwayatView
            dramas={MOCK_DRAMAS}
            watchHistory={watchHistory}
            onClearHistory={handleClearHistory}
            onSelectDrama={handleSelectDrama}
          />
        )}

        {currentView === 'chat' && (
          <GlobalChatView userProfile={userProfile} />
        )}

        {currentView === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
            daftarkuCount={daftarkuIds.length}
            historyCount={watchHistory.length}
            onViewPrivacy={() => setCurrentView('privacy')}
          />
        )}

        {currentView === 'apistatus' && (
          <ApiStatusView
            activeProvider={activeProvider}
            onSelectProvider={(p) => setActiveProvider(p)}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyView onBack={() => setCurrentView('profile')} />
        )}
      </main>

      {/* Bottom Floating Navigation Bar (Hidden in Fullscreen Player) */}
      {currentView !== 'player' && (
        <BottomNav
          currentView={currentView}
          onViewChange={(viewId) => {
            setCurrentView(viewId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          daftarkuCount={daftarkuIds.length}
        />
      )}

      {/* Slide-over Sidebar Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onViewChange={(viewId) => {
          setCurrentView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userProfile={userProfile}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        dramas={MOCK_DRAMAS}
        onSelectDrama={handleSelectDrama}
      />

    </div>
  );
}
