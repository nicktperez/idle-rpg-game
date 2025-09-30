// Game state and configuration
class GameState {
    constructor() {
        // Cache frequently accessed DOM elements
        this.domCache = {};
        
        this.player = {
            level: 1,
            hp: 100,
            maxHp: 100,
            strength: 10,
            defense: 5,
            gold: 0,
            gems: 0,
            exp: 0,
            expToNext: 100,
            autoAttack: false,
            critChance: 0.05,
            goldBonus: 1.0,
            healthRegen: 0,
            prestigeLevel: 0,
            prestigeGoldBonus: 0,
            prestigeExpBonus: 0
        };
        
        // Consumable items
        this.consumables = {
            healPotion: 3,
            poisonPotion: 2,
            strengthPotion: 1,
            defensePotion: 1
        };
        
        // Enhanced statistics tracking
        this.stats = {
            monstersDefeated: 0,
            totalDamageDealt: 0,
            criticalHits: 0,
            highestDamage: 0,
            totalGoldEarned: 0,
            goldSpent: 0,
            itemsPurchased: 0,
            skillsUpgraded: 0,
            timePlayed: 0,
            gameStarted: new Date().toLocaleString()
        };
        
        // Tutorial system
        this.tutorial = {
            currentStep: 0,
            completed: false,
            steps: [
                {
                    title: "Welcome to Idle RPG Adventure!",
                    text: "This is your character! You'll fight monsters, level up, and become stronger. Let's start by clicking on the monster to attack it!",
                    target: ".monster-sprite",
                    action: "click"
                },
                {
                    title: "Great! You attacked the monster!",
                    text: "Notice how the monster's health decreased. Keep attacking until it's defeated to earn gold and experience!",
                    target: ".monster-sprite",
                    action: "wait"
                },
                {
                    title: "Time to spend your gold!",
                    text: "Click on the Skills tab to see your skill tree. These skills will make you much stronger!",
                    target: "[data-tab='skills']",
                    action: "click"
                },
                {
                    title: "Buy your first skill!",
                    text: "Click on 'Auto Attack' to purchase it. This will let you fight monsters automatically!",
                    target: "[data-skill='auto-attack']",
                    action: "click"
                },
                {
                    title: "Check out the shop!",
                    text: "Go to the Shop tab to buy better equipment. Better weapons and armor will make you much stronger!",
                    target: "[data-tab='shop']",
                    action: "click"
                },
                {
                    title: "Buy some equipment!",
                    text: "Click on any weapon or armor to purchase it. You'll see your stats increase immediately!",
                    target: ".buy-btn",
                    action: "click"
                },
                {
                    title: "Check your achievements!",
                    text: "Go to the Achievements tab to see your progress. Unlocking achievements gives you permanent bonuses!",
                    target: "[data-tab='achievements']",
                    action: "click"
                },
                {
                    title: "You're ready to play!",
                    text: "That's it! Now you know how to play. The game will continue running even when you're not actively playing. Have fun!",
                    target: null,
                    action: "complete"
                }
            ]
        };
        
        this.equipment = {
            weapon: { name: 'Rusty Sword', damage: 5, cost: 0 },
            armor: { name: 'Cloth Armor', defense: 2, cost: 0 },
            accessory: null
        };
        
        this.skills = {
            // Combat Skills
            'auto-attack': { level: 0, cost: 100, effect: 0.1, maxLevel: 50, type: 'combat' },
            'crit-chance': { level: 0, cost: 250, effect: 0.02, maxLevel: 25, type: 'combat' },
            'double-strike': { level: 0, cost: 500, effect: 0.05, maxLevel: 20, type: 'combat' },
            'berserker': { level: 0, cost: 1000, effect: 0.1, maxLevel: 15, type: 'combat' },
            'executioner': { level: 0, cost: 2000, effect: 0.15, maxLevel: 10, type: 'combat' },
            'devastation': { level: 0, cost: 5000, effect: 0.2, maxLevel: 5, type: 'combat' },
            
            // Economy Skills
            'gold-bonus': { level: 0, cost: 300, effect: 0.1, maxLevel: 20, type: 'economy' },
            'treasure-hunter': { level: 0, cost: 800, effect: 0.15, maxLevel: 15, type: 'economy' },
            'merchant': { level: 0, cost: 1500, effect: 0.2, maxLevel: 12, type: 'economy' },
            'golden-touch': { level: 0, cost: 3000, effect: 0.25, maxLevel: 10, type: 'economy' },
            'philosophers-stone': { level: 0, cost: 8000, effect: 0.3, maxLevel: 8, type: 'economy' },
            'midas-touch': { level: 0, cost: 20000, effect: 0.5, maxLevel: 5, type: 'economy' },
            
            // Utility Skills
            'health-regen': { level: 0, cost: 200, effect: 1, maxLevel: 30, type: 'utility' },
            'vitality': { level: 0, cost: 600, effect: 10, maxLevel: 20, type: 'utility' },
            'swiftness': { level: 0, cost: 1200, effect: 0.05, maxLevel: 15, type: 'utility' },
            'fortitude': { level: 0, cost: 2500, effect: 0.1, maxLevel: 12, type: 'utility' },
            'immortality': { level: 0, cost: 10000, effect: 0.2, maxLevel: 8, type: 'utility' },
            'transcendence': { level: 0, cost: 50000, effect: 0.5, maxLevel: 5, type: 'utility' },
            
            // Prestige Skills
            'prestige-power': { level: 0, cost: 100, effect: 0.05, maxLevel: 50, type: 'prestige', currency: 'gems' },
            'eternal-wisdom': { level: 0, cost: 250, effect: 0.1, maxLevel: 25, type: 'prestige', currency: 'gems' },
            'cosmic-force': { level: 0, cost: 500, effect: 0.15, maxLevel: 20, type: 'prestige', currency: 'gems' },
            'divine-blessing': { level: 0, cost: 1000, effect: 0.2, maxLevel: 15, type: 'prestige', currency: 'gems' },
            'reality-bender': { level: 0, cost: 2500, effect: 0.25, maxLevel: 12, type: 'prestige', currency: 'gems' },
            'omnipotence': { level: 0, cost: 10000, effect: 0.5, maxLevel: 8, type: 'prestige', currency: 'gems' }
        };
        
        this.inventory = [];
        this.achievements = this.initializeAchievements();
        this.quests = this.initializeQuests();
        this.raids = this.initializeRaids();
        this.currentMonster = null;
        this.currentRaid = null;
        this.combatLog = [];
        this.gameStartTime = Date.now();
        this.lastQuestReset = Date.now();
        this.lastDailyRaidReset = Date.now();
        this.lastWeeklyRaidReset = Date.now();
        this.lastMonthlyRaidReset = Date.now();
        
        // World Map System
        this.currentLocation = 'world-map';
        this.locationNames = {
            'world-map': 'World Map',
            'battle': 'Battle Arena',
            'shop': 'Equipment Shop',
            'skills': 'Training Grounds',
            'inventory': 'Camp',
            'raids': 'Raid Dungeons',
            'prestige': 'Temple of Ascension'
        };
        
        // Combat system
        this.lastAutoAttack = 0;
        this.autoAttackInterval = 1000; // 1 second
        this.lastHealthRegen = 0;
        this.healthRegenInterval = 3000; // 3 seconds
        
        // Audio context for sound effects
        this.audioContext = null;
        this.sounds = {};
        
        this.initializeAudio();
        this.cacheDOM();
        this.spawnMonster();
        this.startGameLoop();
    }
    
    // Cache DOM elements for better performance
    cacheDOM() {
        this.domCache = {
            playerLevel: document.getElementById('player-level'),
            playerHp: document.getElementById('player-hp'),
            playerMaxHp: document.getElementById('player-max-hp'),
            playerGold: document.getElementById('player-gold'),
            playerGems: document.getElementById('player-gems'),
            playerExp: document.getElementById('player-exp'),
            playerExpToNext: document.getElementById('player-exp-to-next'),
            playerDamage: document.getElementById('player-damage'),
            playerDefense: document.getElementById('player-defense'),
            monsterSprite: document.getElementById('monster-sprite'),
            monsterName: document.getElementById('monster-name'),
            monsterHpFill: document.getElementById('monster-hp-fill'),
            monsterHpText: document.getElementById('monster-hp-text'),
            playerSprite: document.getElementById('player-sprite'),
            combatLog: document.getElementById('combat-log'),
            hpFill: document.getElementById('hp-fill'),
            expFill: document.getElementById('exp-fill')
        };
    }
    
    initializeAchievements() {
        return [
            { id: 'first_kill', name: 'First Blood', description: 'Defeat your first monster', icon: '⚔️', unlocked: false, progress: 0, target: 1, reward: '+10 Gold' },
            { id: 'level_5', name: 'Rising Star', description: 'Reach level 5', icon: '⭐', unlocked: false, progress: 0, target: 5, reward: '+1 Strength' },
            { id: 'rich_1000', name: 'Wealthy Warrior', description: 'Accumulate 1000 gold', icon: '💰', unlocked: false, progress: 0, target: 1000, reward: '+5% Gold Gain' },
            { id: 'skill_master', name: 'Skill Master', description: 'Max out a skill', icon: '🎯', unlocked: false, progress: 0, target: 1, reward: '+1 Skill Point' },
            { id: 'monster_slayer', name: 'Monster Slayer', description: 'Defeat 100 monsters', icon: '👹', unlocked: false, progress: 0, target: 100, reward: '+2% Crit Chance' },
            { id: 'equipment_collector', name: 'Equipment Collector', description: 'Own 10 different items', icon: '⚔️', unlocked: false, progress: 0, target: 10, reward: '+1 Defense' },
            { id: 'level_25', name: 'Veteran Fighter', description: 'Reach level 25', icon: '🏆', unlocked: false, progress: 0, target: 25, reward: '+25 Max HP' },
            { id: 'rich_10000', name: 'Gold Hoarder', description: 'Accumulate 10,000 gold', icon: '💎', unlocked: false, progress: 0, target: 10000, reward: '+10% Gold Gain' },
            { id: 'crit_master', name: 'Critical Master', description: 'Deal 50 critical hits', icon: '💥', unlocked: false, progress: 0, target: 50, reward: '+5% Crit Damage' },
            { id: 'prestige_master', name: 'Prestige Master', description: 'Complete your first prestige', icon: '👑', unlocked: false, progress: 0, target: 1, reward: '+50% All Bonuses' },
            { id: 'quest_completer', name: 'Quest Master', description: 'Complete 20 daily quests', icon: '📋', unlocked: false, progress: 0, target: 20, reward: '+2 Quest Rewards' },
            { id: 'time_played', name: 'Dedicated Player', description: 'Play for 1 hour total', icon: '⏰', unlocked: false, progress: 0, target: 3600, reward: '+1% All Stats' },
            { id: 'raid_master', name: 'Raid Master', description: 'Complete 10 raids', icon: '⚔️', unlocked: false, progress: 0, target: 10, reward: '+25% Raid Rewards' }
        ];
    }
    
    initializeQuests() {
        return [
            { 
                id: 'kill_monsters', 
                name: 'Monster Hunter', 
                description: 'Defeat 10 monsters', 
                reward: 500, 
                progress: 0, 
                target: 10, 
                completed: false,
                type: 'combat'
            },
            { 
                id: 'earn_gold', 
                name: 'Gold Rush', 
                description: 'Earn 1000 gold', 
                reward: 750, 
                progress: 0, 
                target: 1000, 
                completed: false,
                type: 'economy'
            },
            { 
                id: 'level_up', 
                name: 'Level Up', 
                description: 'Level up 3 times', 
                reward: 300, 
                progress: 0, 
                target: 3, 
                completed: false,
                type: 'progression'
            },
            { 
                id: 'buy_equipment', 
                name: 'Shopping Spree', 
                description: 'Purchase 2 pieces of equipment', 
                reward: 400, 
                progress: 0, 
                target: 2, 
                completed: false,
                type: 'economy'
            }
        ];
    }
    
    initializeRaids() {
        return {
            daily: [
                {
                    id: 'goblin_king',
                    name: 'Goblin King Raid',
                    description: 'Defeat the tyrannical Goblin King who terrorizes the forest villages',
                    difficulty: 'easy',
                    boss: { name: 'Goblin King', sprite: 'GOBLIN KING', hp: 500, damage: 25, level: 10 },
                    requirements: { level: 5, gold: 0 },
                    rewards: { gold: 1000, exp: 500, items: ['Goblin Crown'] },
                    completed: false,
                    available: true
                },
                {
                    id: 'orc_warlord',
                    name: 'Orc Warlord Raid',
                    description: 'Challenge the mighty Orc Warlord leading raids on merchant caravans',
                    difficulty: 'medium',
                    boss: { name: 'Orc Warlord', sprite: 'ORC LORD', hp: 1000, damage: 40, level: 15 },
                    requirements: { level: 10, gold: 500 },
                    rewards: { gold: 2000, exp: 1000, items: ['Warlord Axe'] },
                    completed: false,
                    available: false
                },
                {
                    id: 'dark_mage',
                    name: 'Dark Mage Raid',
                    description: 'Stop the Dark Mage from completing his forbidden ritual of destruction',
                    difficulty: 'hard',
                    boss: { name: 'Dark Mage', sprite: 'DARK MAGE', hp: 1500, damage: 60, level: 20 },
                    requirements: { level: 15, gold: 1000 },
                    rewards: { gold: 3000, exp: 1500, items: ['Dark Staff'] },
                    completed: false,
                    available: false
                }
            ],
            weekly: [
                {
                    id: 'dragon_prince',
                    name: 'Dragon Prince Raid',
                    description: 'Face the Dragon Prince who guards an ancient mountain treasure hoard',
                    difficulty: 'epic',
                    boss: { name: 'Dragon Prince', sprite: 'DRAGON PRINCE', hp: 5000, damage: 100, level: 30 },
                    requirements: { level: 25, gold: 2000 },
                    rewards: { gold: 10000, exp: 5000, items: ['Dragon Scale Armor', 'Dragon Sword'] },
                    completed: false,
                    available: false
                },
                {
                    id: 'phoenix_king',
                    name: 'Phoenix King Raid',
                    description: 'Battle the immortal Phoenix King who rises from ashes to burn the land',
                    difficulty: 'epic',
                    boss: { name: 'Phoenix King', sprite: 'PHOENIX KING', hp: 7500, damage: 120, level: 35 },
                    requirements: { level: 30, gold: 3000 },
                    rewards: { gold: 15000, exp: 7500, items: ['Phoenix Feather', 'Fire Ring'] },
                    completed: false,
                    available: false
                }
            ],
            monthly: [
                {
                    id: 'world_destroyer',
                    name: 'World Destroyer Raid',
                    description: 'Confront the apocalyptic World Destroyer threatening all of existence',
                    difficulty: 'legendary',
                    boss: { name: 'World Destroyer', sprite: 'WORLD DESTROYER', hp: 20000, damage: 200, level: 50 },
                    requirements: { level: 40, gold: 5000, prestige: 1 },
                    rewards: { gold: 50000, exp: 25000, items: ['World Destroyer Armor', 'Legendary Sword', 'Crown of Power'] },
                    completed: false,
                    available: false
                }
            ]
        };
    }
    
    // World Map Navigation
    navigateToLocation(locationId) {
        console.log('Navigating to:', locationId);
        this.currentLocation = locationId;
        this.updateLocationDisplay();
        this.updateCurrentLocationName();
        this.setupLocationEventListeners(locationId);
    }
    
    setupLocationEventListeners(locationId) {
        // Set up event listeners for specific locations
        console.log('Setting up event listeners for location:', locationId);
        if (locationId === 'battle') {
            console.log('Setting up battle event listeners...');
            this.setupBattleEventListeners();
        } else if (locationId === 'shop') {
            this.setupShopEventListeners();
        }
    }
    
    setupBattleEventListeners() {
        console.log('Setting up battle event listeners...');
        
        // Add click listeners to attack buttons
        const quickAttackBtn = document.getElementById('quick-attack-btn');
        const normalAttackBtn = document.getElementById('normal-attack-btn');
        const powerAttackBtn = document.getElementById('power-attack-btn');
        
        if (quickAttackBtn && !quickAttackBtn.hasAttribute('data-listeners-setup')) {
            quickAttackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Quick attack button clicked!');
                this.attack('quick');
            });
            quickAttackBtn.setAttribute('data-listeners-setup', 'true');
            console.log('Quick attack button listener set up');
        }
        
        if (normalAttackBtn && !normalAttackBtn.hasAttribute('data-listeners-setup')) {
            normalAttackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Normal attack button clicked!');
                this.attack('normal');
            });
            normalAttackBtn.setAttribute('data-listeners-setup', 'true');
            console.log('Normal attack button listener set up');
        }
        
        if (powerAttackBtn && !powerAttackBtn.hasAttribute('data-listeners-setup')) {
            powerAttackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Power attack button clicked!');
                this.attack('power');
            });
            powerAttackBtn.setAttribute('data-listeners-setup', 'true');
            console.log('Power attack button listener set up');
        }
        
        // Add click listeners to consumable items
        const healPotionBtn = document.getElementById('heal-potion-btn');
        const poisonPotionBtn = document.getElementById('poison-potion-btn');
        
        if (healPotionBtn && !healPotionBtn.hasAttribute('data-listeners-setup')) {
            healPotionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Heal potion button clicked!');
                this.useConsumable('healPotion');
            });
            healPotionBtn.setAttribute('data-listeners-setup', 'true');
            console.log('Heal potion button listener set up');
        }
        
        if (poisonPotionBtn && !poisonPotionBtn.hasAttribute('data-listeners-setup')) {
            poisonPotionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Poison potion button clicked!');
                this.useConsumable('poisonPotion');
            });
            poisonPotionBtn.setAttribute('data-listeners-setup', 'true');
            console.log('Poison potion button listener set up');
        }
        
        // Update consumable displays
        this.updateConsumableDisplays();
        
        // Add global click listener as fallback - listen for clicks on battle arena elements
        const battleSection = document.getElementById('battle-area');
        if (battleSection && !battleSection.hasAttribute('data-global-listeners-setup')) {
            battleSection.addEventListener('click', (e) => {
                console.log('Global battle click detected on:', e.target);
                
                // Check if clicking on monster sprite, hero sprite, or attack buttons
                if (e.target.closest('#monster-sprite') || 
                    e.target.closest('.monster-sprite') || 
                    e.target.closest('#player-sprite') ||
                    e.target.closest('.attack-btn') ||
                    e.target.closest('.item-btn')) {
                    e.preventDefault();
                    console.log('Battle area clicked - element:', e.target);
                    
                    // Handle different button types
                    if (e.target.closest('.quick-attack')) {
                        this.attack('quick');
                    } else if (e.target.closest('.normal-attack')) {
                        this.attack('normal');
                    } else if (e.target.closest('.power-attack')) {
                        this.attack('power');
                    } else if (e.target.closest('.heal-potion')) {
                        this.useConsumable('healPotion');
                    } else if (e.target.closest('.poison-potion')) {
                        this.useConsumable('poisonPotion');
                    } else {
                        // Default to normal attack for sprite clicks
                        this.attack('normal');
                    }
                }
            });
            battleSection.setAttribute('data-global-listeners-setup', 'true');
            console.log('Global battle event listener set up');
        }
        
        
        // Also add direct click listener to monster sprite container
        const monsterSprite = document.getElementById('monster-sprite');
        if (monsterSprite && !monsterSprite.hasAttribute('data-listeners-setup')) {
            monsterSprite.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Monster sprite container clicked - attacking!');
                this.attack();
            });
            monsterSprite.setAttribute('data-listeners-setup', 'true');
            console.log('Monster sprite container event listener set up');
        }
        
        // Add test button event listener
        const testButton = document.getElementById('test-attack-btn');
        if (testButton && !testButton.hasAttribute('data-listeners-setup')) {
            testButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Test attack button clicked!');
                this.attack();
            });
            testButton.setAttribute('data-listeners-setup', 'true');
            console.log('Test attack button event listener set up');
        }
        
        console.log('All battle event listeners set up');
    }
    
    setupShopEventListeners() {
        // Shop event listeners are already set up globally, but we can add location-specific ones here if needed
        console.log('Shop event listeners ready');
    }
    
    updateLocationDisplay() {
        console.log('Updating display for location:', this.currentLocation);
        
        // Hide all sections
        document.getElementById('world-map').classList.remove('active');
        document.querySelectorAll('.location-content').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show current location
        if (this.currentLocation === 'world-map') {
            document.getElementById('world-map').classList.add('active');
            console.log('Showing world map');
        } else {
            const targetSection = document.getElementById(this.currentLocation + '-area');
            console.log('Looking for section:', this.currentLocation + '-area', targetSection);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('Showing location section:', this.currentLocation);
                
                // Update displays when entering battle area
                if (this.currentLocation === 'battle') {
                    this.updateAllDisplays();
                }
            } else {
                console.error('Location section not found:', this.currentLocation + '-area');
            }
        }
    }
    
    updateCurrentLocationName() {
        const locationNameElement = document.getElementById('current-location-name');
        if (locationNameElement) {
            locationNameElement.textContent = this.locationNames[this.currentLocation] || 'Unknown Location';
        }
    }
    
    backToMap() {
        this.navigateToLocation('world-map');
    }
    
    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    createSounds() {
        // Create simple sound effects using Web Audio API
        this.sounds = {
            attack: this.createTone(200, 0.1, 'sawtooth'),
            crit: this.createTone(400, 0.2, 'square'),
            levelUp: this.createTone(800, 0.5, 'sine'),
            purchase: this.createTone(600, 0.1, 'triangle'),
            achievement: this.createTone(1000, 0.3, 'sine')
        };
    }
    
    createTone(frequency, duration, type) {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
    
    spawnMonster() {
        const monsterTypes = [
            { name: 'Baby Dragon', sprite: 'DRAGON', hp: 50, damage: 8, gold: 25, exp: 20 },
            { name: 'Goblin', sprite: 'GOBLIN', hp: 30, damage: 5, gold: 15, exp: 12 },
            { name: 'Orc', sprite: 'ORC', hp: 80, damage: 12, gold: 40, exp: 35 },
            { name: 'Skeleton', sprite: 'SKELETON', hp: 25, damage: 4, gold: 12, exp: 10 },
            { name: 'Dark Mage', sprite: 'MAGE', hp: 60, damage: 15, gold: 50, exp: 45 },
            { name: 'Giant Spider', sprite: 'SPIDER', hp: 40, damage: 7, gold: 20, exp: 18 },
            { name: 'Minotaur', sprite: 'MINOTAUR', hp: 120, damage: 20, gold: 75, exp: 60 },
            { name: 'Phoenix', sprite: 'PHOENIX', hp: 90, damage: 18, gold: 60, exp: 50 }
        ];
        
        // Scale monster stats based on player level
        const baseMonster = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
        const levelMultiplier = 1 + (this.player.level - 1) * 0.3;
        
        this.currentMonster = {
            ...baseMonster,
            maxHp: Math.floor(baseMonster.hp * levelMultiplier),
            damage: Math.floor(baseMonster.damage * levelMultiplier),
            gold: Math.floor(baseMonster.gold * levelMultiplier),
            exp: Math.floor(baseMonster.exp * levelMultiplier)
        };
        
        this.currentMonster.hp = this.currentMonster.maxHp;
        console.log('Monster spawned:', this.currentMonster);
        this.updateMonsterDisplay();
    }
    
    updateMonsterDisplay() {
        const monsterSprite = this.domCache.monsterSprite || document.getElementById('monster-sprite');
        const monsterName = this.domCache.monsterName || document.getElementById('monster-name');
        const monsterHpFill = this.domCache.monsterHpFill || document.getElementById('monster-hp-fill');
        const monsterHpText = this.domCache.monsterHpText || document.getElementById('monster-hp-text');
        
        console.log('Updating monster display:', this.currentMonster?.name, 'HP:', this.currentMonster?.hp, '/', this.currentMonster?.maxHp);
        
        if (this.currentMonster) {
            // Clear any existing content
            monsterSprite.innerHTML = '';
            
            // Get the appropriate SVG sprite based on monster type
            const spriteId = this.getMonsterSpriteId(this.currentMonster.name);
            const spriteTemplate = document.getElementById(spriteId);
            
            if (spriteTemplate) {
                // Clone the SVG sprite and add it to the monster sprite container
                const spriteClone = spriteTemplate.cloneNode(true);
                spriteClone.id = spriteId + '-display';
                spriteClone.style.cursor = 'pointer';
                spriteClone.style.userSelect = 'none';
                
                // Add click event listener directly to the SVG and all its children
                const addClickListeners = (element) => {
                    element.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('SVG monster sprite clicked - attacking!', this.currentMonster.name);
                        this.attack();
                    });
                    
                    // Add to all child elements too
                    Array.from(element.children).forEach(child => {
                        addClickListeners(child);
                    });
                };
                
                addClickListeners(spriteClone);
                
                monsterSprite.appendChild(spriteClone);
                console.log('Monster sprite loaded:', this.currentMonster.name, 'with click listeners');
            } else {
                // Fallback to text if sprite not found
                monsterSprite.textContent = this.currentMonster.sprite || 'MONSTER';
                console.log('Sprite not found, using text fallback');
            }
            
            monsterName.textContent = this.currentMonster.name;
            
            const hpPercent = (this.currentMonster.hp / this.currentMonster.maxHp) * 100;
            console.log('Setting HP bar to:', hpPercent + '%', 'Elements found:', !!monsterHpFill, !!monsterHpText);
            
            if (monsterHpFill) {
                monsterHpFill.style.width = hpPercent + '%';
                console.log('HP bar width set to:', monsterHpFill.style.width);
            } else {
                console.error('monsterHpFill element not found!');
            }
            
            if (monsterHpText) {
                monsterHpText.textContent = `${this.currentMonster.hp}/${this.currentMonster.maxHp}`;
                console.log('HP text set to:', monsterHpText.textContent);
            } else {
                console.error('monsterHpText element not found!');
            }
        }
    }
    
    getMonsterSpriteId(monsterName) {
        // Map monster names to sprite IDs
        const spriteMap = {
            'Baby Dragon': 'dragon-sprite',
            'Goblin': 'goblin-sprite',
            'Orc': 'orc-sprite',
            'Skeleton': 'skeleton-sprite',
            'Dark Mage': 'mage-sprite',
            'Giant Spider': 'spider-sprite',
            'Minotaur': 'minotaur-sprite',
            'Phoenix': 'phoenix-sprite'
        };
        
        return spriteMap[monsterName] || 'goblin-sprite'; // Default to goblin if not found
    }
    
    showCombatEffects() {
        const combatEffects = document.getElementById('combat-effects');
        if (!combatEffects) return;
        
        // Clear previous effects
        combatEffects.innerHTML = '';
        
        // Create attack swipe effect
        const attackSwipe = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        attackSwipe.setAttribute('x1', '200');
        attackSwipe.setAttribute('y1', '250');
        attackSwipe.setAttribute('x2', '600');
        attackSwipe.setAttribute('y2', '250');
        attackSwipe.setAttribute('stroke', '#ff6b35');
        attackSwipe.setAttribute('stroke-width', '8');
        attackSwipe.setAttribute('opacity', '0.8');
        attackSwipe.setAttribute('class', 'attack-effect');
        attackSwipe.setAttribute('stroke-linecap', 'round');
        
        combatEffects.appendChild(attackSwipe);
        
        // Remove effect after animation
        setTimeout(() => {
            if (combatEffects.contains(attackSwipe)) {
                combatEffects.removeChild(attackSwipe);
            }
        }, 600);
        
        console.log('Combat effects triggered');
    }
    
    showHeroAttackAnimation() {
        const heroSprite = document.getElementById('player-sprite');
        if (heroSprite) {
            heroSprite.classList.add('attacking');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                heroSprite.classList.remove('attacking');
            }, 600);
        }
    }
    
    showFloatingDamage(damage, isCrit, target) {
        const floatingContainer = document.getElementById('floating-damage');
        if (!floatingContainer) return;
        
        // Get target position
        const targetElement = target === 'monster' ? 
            document.getElementById('monster-sprite') : 
            document.getElementById('player-sprite');
        
        if (!targetElement) return;
        
        const rect = targetElement.getBoundingClientRect();
        const containerRect = floatingContainer.getBoundingClientRect();
        
        // Create damage number element
        const damageElement = document.createElement('div');
        damageElement.className = 'damage-number';
        
        if (isCrit) {
            damageElement.classList.add('critical');
            damageElement.textContent = `CRIT! ${damage}`;
        } else {
            damageElement.textContent = `-${damage}`;
        }
        
        // Position above the target
        const x = rect.left - containerRect.left + (rect.width / 2) - 30;
        const y = rect.top - containerRect.top - 20;
        
        damageElement.style.left = x + 'px';
        damageElement.style.top = y + 'px';
        
        // Add to container
        floatingContainer.appendChild(damageElement);
        
        // Remove after animation
        setTimeout(() => {
            if (floatingContainer.contains(damageElement)) {
                floatingContainer.removeChild(damageElement);
            }
        }, 1500);
        
        console.log('Floating damage shown:', damage, 'Critical:', isCrit);
    }
    
    useConsumable(itemType) {
        if (this.consumables[itemType] <= 0) {
            this.addToCombatLog(`No ${itemType} remaining!`);
            return;
        }
        
        switch (itemType) {
            case 'healPotion':
                const healAmount = Math.floor(this.player.maxHp * 0.5); // Heal 50% of max HP
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
                this.consumables.healPotion--;
                this.addToCombatLog(`Used Heal Potion! Restored ${healAmount} HP.`);
                this.showFloatingDamage(-healAmount, false, 'player'); // Negative for healing
                break;
                
            case 'poisonPotion':
                if (this.currentMonster) {
                    const poisonDamage = Math.floor(this.currentMonster.maxHp * 0.3); // 30% of monster max HP
                    this.currentMonster.hp -= poisonDamage;
                    this.consumables.poisonPotion--;
                    this.addToCombatLog(`Used Poison! Dealt ${poisonDamage} poison damage!`);
                    this.showFloatingDamage(poisonDamage, false, 'monster');
                    this.updateMonsterDisplay();
                } else {
                    this.addToCombatLog('No monster to poison!');
                    return;
                }
                break;
        }
        
        this.updateConsumableDisplays();
        this.updatePlayerDisplay();
    }
    
    updateConsumableDisplays() {
        const healCount = document.getElementById('heal-potion-count');
        const poisonCount = document.getElementById('poison-potion-count');
        
        if (healCount) {
            healCount.textContent = this.consumables.healPotion;
            document.getElementById('heal-potion-btn').disabled = this.consumables.healPotion <= 0;
        }
        
        if (poisonCount) {
            poisonCount.textContent = this.consumables.poisonPotion;
            document.getElementById('poison-potion-btn').disabled = this.consumables.poisonPotion <= 0;
        }
    }
    
    updateHeroSprite() {
        const playerSprite = document.getElementById('player-sprite');
        if (!playerSprite) return;
        
        // Clear any existing content
        playerSprite.innerHTML = '';
        
        // For now, use the knight sprite. Later we'll make this gear-based
        const spriteTemplate = document.getElementById('knight-sprite');
        
        if (spriteTemplate) {
            // Clone the SVG sprite and add it to the player sprite container
            const spriteClone = spriteTemplate.cloneNode(true);
            spriteClone.id = 'knight-sprite-display';
            spriteClone.style.cursor = 'pointer';
            spriteClone.style.userSelect = 'none';
            
            // Add click event listener for attacking
            const addClickListeners = (element) => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Hero sprite clicked - attacking!');
                    this.attack();
                });
                
                // Add to all child elements too
                Array.from(element.children).forEach(child => {
                    addClickListeners(child);
                });
            };
            
            addClickListeners(spriteClone);
            
            playerSprite.appendChild(spriteClone);
            console.log('Hero sprite loaded: Knight');
        } else {
            // Fallback to text if sprite not found
            playerSprite.textContent = 'HERO';
            console.log('Hero sprite not found, using text fallback');
        }
    }
    
    updatePlayerDisplay() {
        if (this.domCache.playerLevel) this.domCache.playerLevel.textContent = this.player.level;
        if (this.domCache.playerHp) this.domCache.playerHp.textContent = Math.floor(this.player.hp);
        if (this.domCache.playerMaxHp) this.domCache.playerMaxHp.textContent = this.player.maxHp;
        
        // Update HP bar
        if (this.domCache.hpFill) {
            const hpPercent = Math.max(0, Math.min(100, (this.player.hp / this.player.maxHp) * 100));
            this.domCache.hpFill.style.width = hpPercent + '%';
        }
        
        // Update EXP bar
        if (this.domCache.expFill) {
            const expPercent = Math.max(0, Math.min(100, (this.player.exp / this.player.expToNext) * 100));
            this.domCache.expFill.style.width = expPercent + '%';
        }
        
        if (this.domCache.playerExp) this.domCache.playerExp.textContent = Math.floor(this.player.exp);
        if (this.domCache.playerExpToNext) this.domCache.playerExpToNext.textContent = this.player.expToNext;
        
        // Update hero sprite
        this.updateHeroSprite();
        
        const playerDamage = document.getElementById('player-damage');
        const playerDefense = document.getElementById('player-defense');
        if (playerDamage) playerDamage.textContent = this.player.strength;
        if (playerDefense) playerDefense.textContent = this.player.defense;
        
        if (this.domCache.playerGold) this.domCache.playerGold.textContent = this.formatNumber(this.player.gold);
        if (this.domCache.playerGems) this.domCache.playerGems.textContent = this.player.gems;
    }
    
    // Helper to format large numbers
    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return Math.floor(num).toLocaleString();
    }
    
    attack(attackType = 'normal') {
        console.log('Attack function called with type:', attackType);
        console.log('Current monster:', this.currentMonster);
        
        if (!this.currentMonster || this.currentMonster.hp <= 0) {
            console.log('No valid monster to attack, spawning new monster...');
            this.spawnMonster();
            return;
        }
        
        console.log('Attacking monster:', this.currentMonster.name, 'HP:', this.currentMonster.hp);
        
        // Add hero attack animation
        this.showHeroAttackAnimation();
        
        // Add visual combat effects
        this.showCombatEffects();
        
        const weaponDamage = this.equipment.weapon ? this.equipment.weapon.damage : 0;
        let baseDamage = this.player.strength + weaponDamage;
        
        // Apply attack type modifiers
        switch (attackType) {
            case 'quick':
                baseDamage = Math.floor(baseDamage * 0.7); // 70% damage, faster
                break;
            case 'power':
                baseDamage = Math.floor(baseDamage * 1.5); // 150% damage, slower
                break;
            case 'normal':
            default:
                // 100% damage
                break;
        }
        
        // Critical hit calculation
        const isCrit = Math.random() < this.player.critChance;
        const damage = Math.floor(baseDamage * (isCrit ? 2.5 : 1));
        
        // Player attack animation
        const playerSprite = document.getElementById('player-sprite');
        playerSprite.classList.add('attacking');
        
        // Show damage after animation
        setTimeout(() => {
            this.currentMonster.hp -= damage;
            this.updateMonsterDisplay(); // Update health bar immediately
            this.showFloatingDamage(damage, isCrit, 'monster');
            this.showDamageNumber(damage, isCrit);
            this.playSound(isCrit ? 'crit' : 'attack');
            
            // Monster damage animation
            const monsterSprite = document.getElementById('monster-sprite');
            monsterSprite.classList.add('taking-damage');
            
            // Remove animation classes
            setTimeout(() => {
                playerSprite.classList.remove('attacking');
                monsterSprite.classList.remove('taking-damage');
            }, 300);
            
            // Update stats
            this.stats.totalDamageDealt += damage;
            if (isCrit) {
                this.stats.criticalHits++;
                this.updateAchievementProgress('crit_master', 1);
            }
            if (damage > this.stats.highestDamage) {
                this.stats.highestDamage = damage;
            }
            
            this.addToCombatLog(`${isCrit ? 'CRITICAL HIT! ' : ''}You deal ${damage} damage!`);
            
            if (this.currentMonster.hp <= 0) {
                this.defeatMonster();
            } else {
                // Monster counter-attack
                setTimeout(() => this.monsterAttack(), 500);
            }
            
            this.updateMonsterDisplay();
            this.updateAchievementProgress('monster_slayer', 1);
            this.updateQuestProgress('kill_monsters', 1);
        }, 250);
    }
    
    monsterAttack() {
        if (!this.currentMonster) return;
        
        const armorDefense = this.equipment.armor ? this.equipment.armor.defense : 0;
        const totalDefense = this.player.defense + armorDefense;
        const damage = Math.max(1, this.currentMonster.damage - totalDefense);
        
        // Monster attack animation
        const monsterSprite = document.getElementById('monster-sprite');
        monsterSprite.classList.add('attacking');
        
        setTimeout(() => {
            this.player.hp -= damage;
            this.showFloatingDamage(damage, false, 'player');
            this.showDamageNumber(damage, false, true);
            
            // Player damage animation
            const playerSprite = document.getElementById('player-sprite');
            playerSprite.classList.add('taking-damage');
            
            // Remove animation classes
            setTimeout(() => {
                monsterSprite.classList.remove('attacking');
                playerSprite.classList.remove('taking-damage');
            }, 300);
            
            this.addToCombatLog(`${this.currentMonster.name} deals ${damage} damage!`);
            
            if (this.player.hp <= 0) {
                this.player.hp = 1; // Prevent death for now
                this.addToCombatLog('You are knocked unconscious!');
            }
            
            this.updatePlayerDisplay();
        }, 250);
    }
    
    defeatMonster() {
        // Check if this is a raid boss
        if (this.currentMonster.isRaidBoss) {
            this.completeRaid();
            return;
        }
        
        const goldReward = Math.floor(this.currentMonster.gold * this.player.goldBonus * (1 + this.player.prestigeGoldBonus));
        const expReward = Math.floor(this.currentMonster.exp * (1 + this.player.prestigeExpBonus));
        
        this.player.gold += goldReward;
        this.player.exp += expReward;
        
        // Update stats
        this.stats.monstersDefeated++;
        this.stats.totalGoldEarned += goldReward;
        
        this.addToCombatLog(`You defeated ${this.currentMonster.name}!`);
        this.addToCombatLog(`Gained ${goldReward} gold and ${expReward} EXP!`);
        
        // Check for level up
        if (this.player.exp >= this.player.expToNext) {
            this.levelUp();
        }
        
        // Check achievements and quests
        this.updateAchievementProgress('first_kill', 1);
        this.updateAchievementProgress('rich_1000', goldReward);
        this.updateAchievementProgress('rich_10000', goldReward);
        this.updateQuestProgress('earn_gold', goldReward);
        
        // Spawn new monster after delay
        setTimeout(() => {
            this.spawnMonster();
        }, 1500);
        
        this.updatePlayerDisplay();
    }
    
    levelUp() {
        this.player.level++;
        this.player.exp -= this.player.expToNext;
        this.player.expToNext = Math.floor(this.player.expToNext * 1.2);
        
        // Increase stats
        this.player.maxHp += 20;
        this.player.hp = this.player.maxHp; // Full heal on level up
        this.player.strength += 2;
        this.player.defense += 1;
        
        this.addToCombatLog(`LEVEL UP! You are now level ${this.player.level}!`);
        this.playSound('levelUp');
        this.showNotification('Level Up!', 'You have reached a new level!');
        
        // Update achievements and quests
        this.updateAchievementProgress('level_5', 1);
        this.updateAchievementProgress('level_25', 1);
        this.updateQuestProgress('level_up', 1);
        
        this.updatePlayerDisplay();
    }
    
    purchaseSkill(skillName) {
        const skill = this.skills[skillName];
        if (!skill || skill.level >= skill.maxLevel) {
            console.log('Cannot purchase skill:', skillName, 'Skill:', skill);
            return false;
        }
        
        // Determine cost and currency
        const currency = skill.currency || 'gold';
        const cost = Math.floor(skill.cost * Math.pow(1.5, skill.level));
        
        // Check if player has enough currency
        const hasEnough = currency === 'gems' ? this.player.gems >= cost : this.player.gold >= cost;
        
        if (hasEnough) {
            // Deduct cost
            if (currency === 'gems') {
                this.player.gems -= cost;
            } else {
                this.player.gold -= cost;
                this.stats.goldSpent += cost;
            }
            
            skill.level++;
            this.stats.skillsUpgraded++;
            
            // Apply skill effects dynamically
            this.applySkillEffects();
            
            this.playSound('purchase');
            this.updateSkillDisplay();
            this.updatePlayerDisplay();
            this.updateAchievementProgress('skill_master', skill.level === skill.maxLevel ? 1 : 0);
            
            return true;
        }
        
        return false;
    }
    
    // Apply all skill effects
    applySkillEffects() {
        // Combat skills
        this.player.autoAttack = this.skills['auto-attack'].level > 0;
        this.player.critChance = 0.05 + (this.skills['crit-chance'].level * 0.02);
        
        // Economy skills
        this.player.goldBonus = 1.0 + (this.skills['gold-bonus'].level * 0.1);
        
        // Utility skills
        this.player.healthRegen = this.skills['health-regen'].level * 1;
        
        // Apply max HP from vitality
        const baseMaxHp = 100 + (this.player.level - 1) * 20;
        const vitalityBonus = this.skills['vitality'].level * 10;
        this.player.maxHp = baseMaxHp + vitalityBonus;
    }
    
    updateSkillDisplay() {
        Object.keys(this.skills).forEach(skillName => {
            const skill = this.skills[skillName];
            const skillNode = document.querySelector(`[data-skill="${skillName}"]`);
            
            if (!skillNode) return; // Skip if node doesn't exist in HTML
            
            const levelNum = skillNode.querySelector('.skill-level-num');
            const costNum = skillNode.querySelector('.skill-cost-num');
            
            if (levelNum) levelNum.textContent = skill.level;
            
            if (costNum) {
                if (skill.level >= skill.maxLevel) {
                    costNum.textContent = 'MAX';
                    skillNode.classList.add('purchased');
                } else {
                    const cost = Math.floor(skill.cost * Math.pow(1.5, skill.level));
                    const currency = skill.currency === 'gems' ? ' 💎' : ' GOLD';
                    costNum.textContent = this.formatNumber(cost);
                    
                    // Update cost display text
                    const costText = skillNode.querySelector('.skill-cost');
                    if (costText) {
                        costText.textContent = `Cost: ${this.formatNumber(cost)}${currency}`;
                    }
                    
                    if (skill.level > 0) {
                        skillNode.classList.add('purchased');
                    }
                }
            }
        });
    }
    
    purchaseItem(item) {
        if (this.player.gold >= item.cost) {
            this.player.gold -= item.cost;
            
            // Update stats
            this.stats.goldSpent += item.cost;
            this.stats.itemsPurchased++;
            
            // Handle consumables differently
            if (item.type === 'consumable' && item.consumableType) {
                // Add to consumable count
                if (this.consumables[item.consumableType] !== undefined) {
                    this.consumables[item.consumableType]++;
                    this.updateConsumableDisplays();
                    this.showNotification('Item Purchased', `Bought ${item.name}!`);
                }
            } else {
                // Add equipment to inventory
                this.inventory.push({ ...item, id: Date.now() });
                this.updateInventoryDisplay();
                this.updateAchievementProgress('equipment_collector', 1);
                this.updateQuestProgress('buy_equipment', 1);
            }
            
            this.playSound('purchase');
            this.updatePlayerDisplay();
            
            return true;
        }
        return false;
    }
    
    equipItem(item) {
        if (item.type === 'weapon') {
            this.equipment.weapon = item;
        } else if (item.type === 'armor') {
            this.equipment.armor = item;
        } else if (item.type === 'accessory') {
            this.equipment.accessory = item;
        }
        
        this.updateEquipmentDisplay();
        this.updateInventoryDisplay();
    }
    
    updateEquipmentDisplay() {
        const weaponSlot = document.querySelector('[data-slot="weapon"] .item-name');
        const armorSlot = document.querySelector('[data-slot="armor"] .item-name');
        const accessorySlot = document.querySelector('[data-slot="accessory"] .item-name');
        
        weaponSlot.textContent = this.equipment.weapon ? this.equipment.weapon.name : 'None';
        armorSlot.textContent = this.equipment.armor ? this.equipment.armor.name : 'None';
        accessorySlot.textContent = this.equipment.accessory ? this.equipment.accessory.name : 'None';
    }
    
    updateInventoryDisplay() {
        const inventoryGrid = document.getElementById('inventory-grid');
        inventoryGrid.innerHTML = '';
        
        // Create 20 inventory slots
        for (let i = 0; i < 20; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            
            if (i < this.inventory.length) {
                const item = this.inventory[i];
                slot.classList.add('occupied');
                const iconHTML = item.icon ? getSVGIconHTML(item.icon, 30) : getSVGIconHTML('icon-sword', 30);
                slot.innerHTML = iconHTML;
                slot.title = `${item.name}\n${item.description || ''}`;
                
                slot.addEventListener('click', () => {
                    if (item.type) {
                        this.equipItem(item);
                        this.inventory.splice(i, 1);
                        this.updateInventoryDisplay();
                    }
                });
            }
            
            inventoryGrid.appendChild(slot);
        }
    }
    
    updateAchievementProgress(achievementId, progress) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (!achievement || achievement.unlocked) return;
        
        achievement.progress += progress;
        
        if (achievement.progress >= achievement.target) {
            achievement.unlocked = true;
        this.playSound('achievement');
        this.showNotification('Achievement Unlocked!', achievement.name);
    }
    
    this.updateAchievementsDisplay();
}

// Tutorial System Methods
startTutorial() {
    if (this.tutorial.completed) return;
    
    this.tutorial.currentStep = 0;
    this.updateTutorialDisplay();
    document.getElementById('tutorial-overlay').style.display = 'flex';
}

updateTutorialDisplay() {
    const step = this.tutorial.steps[this.tutorial.currentStep];
    const overlay = document.getElementById('tutorial-overlay');
    
    if (!step || this.tutorial.currentStep >= this.tutorial.steps.length) {
        this.completeTutorial();
        return;
    }
    
    document.getElementById('tutorial-title').textContent = step.title;
    document.getElementById('tutorial-text').textContent = step.text;
    document.getElementById('tutorial-step').textContent = `Step ${this.tutorial.currentStep + 1} of ${this.tutorial.steps.length}`;
    
    const progressFill = document.getElementById('tutorial-progress-fill');
    const progressPercent = ((this.tutorial.currentStep + 1) / this.tutorial.steps.length) * 100;
    progressFill.style.width = progressPercent + '%';
    
    // Update button states
    document.getElementById('tutorial-prev').disabled = this.tutorial.currentStep === 0;
    document.getElementById('tutorial-next').disabled = false;
    
    // Highlight target element
    if (step.target) {
        this.highlightElement(step.target);
    }
}

highlightElement(selector) {
    // Remove previous highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });
    
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add('tutorial-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

nextTutorialStep() {
    if (this.tutorial.currentStep < this.tutorial.steps.length - 1) {
        this.tutorial.currentStep++;
        this.updateTutorialDisplay();
    } else {
        this.completeTutorial();
    }
}

prevTutorialStep() {
    if (this.tutorial.currentStep > 0) {
        this.tutorial.currentStep--;
        this.updateTutorialDisplay();
    }
}

completeTutorial() {
    this.tutorial.completed = true;
    document.getElementById('tutorial-overlay').style.display = 'none';
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });
    this.showNotification('Tutorial Complete!', 'You now know how to play the game!');
}

skipTutorial() {
    if (confirm('Are you sure you want to skip the tutorial? You can always restart it from the help menu.')) {
        this.completeTutorial();
    }
}

// Quest System Methods
updateQuestProgress(questId, progress) {
    const quest = this.quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;
    
    quest.progress += progress;
    
    if (quest.progress >= quest.target) {
        quest.completed = true;
        this.completeQuest(quest);
    }
    
    this.updateQuestsDisplay();
}

completeQuest(quest) {
    this.player.gold += quest.reward;
    this.stats.totalGoldEarned += quest.reward;
    
    this.playSound('achievement');
    this.showNotification('Quest Complete!', `Completed ${quest.name} and earned ${quest.reward} gold!`);
    
    // Update achievement progress
    this.updateAchievementProgress('quest_completer', 1);
    
    this.updatePlayerDisplay();
}

updateQuestsDisplay() {
    const questsList = document.getElementById('quests-list');
    questsList.innerHTML = '';
    
    this.quests.forEach(quest => {
        const questEl = document.createElement('div');
        questEl.className = `quest ${quest.completed ? 'completed' : ''}`;
        
        const progressPercent = Math.min(100, (quest.progress / quest.target) * 100);
        
        questEl.innerHTML = `
            <div class="quest-header">
                <div class="quest-title">${quest.name}</div>
                <div class="quest-reward">${quest.reward} 💰</div>
            </div>
            <div class="quest-description">${quest.description}</div>
            <div class="quest-progress">
                <div class="quest-progress-bar">
                    <div class="quest-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div class="quest-progress-text">${quest.progress}/${quest.target}</div>
            </div>
        `;
        
        questsList.appendChild(questEl);
    });
    
    // Update quest timer
    this.updateQuestTimer();
}

updateQuestTimer() {
    const now = Date.now();
    const timeUntilReset = 24 * 60 * 60 * 1000 - (now - this.lastQuestReset) % (24 * 60 * 60 * 1000);
    
    const hours = Math.floor(timeUntilReset / (60 * 60 * 1000));
    const minutes = Math.floor((timeUntilReset % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeUntilReset % (60 * 1000)) / 1000);
    
    document.getElementById('quest-timer').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

    resetQuests() {
        this.lastQuestReset = Date.now();
        this.quests.forEach(quest => {
            quest.progress = 0;
            quest.completed = false;
        });
        this.updateQuestsDisplay();
        this.showNotification('Quests Reset!', 'New daily quests are now available!');
    }

    // Raid System Methods
    canAccessRaid(raid) {
        return this.player.level >= raid.requirements.level &&
               this.player.gold >= raid.requirements.gold &&
               (!raid.requirements.prestige || this.player.prestigeLevel >= raid.requirements.prestige);
    }
    
    startRaid(raidType, raidId) {
        const raid = this.raids[raidType].find(r => r.id === raidId);
        if (!raid || !this.canAccessRaid(raid) || raid.completed) return false;
        
        this.currentRaid = { ...raid, currentHp: raid.boss.hp };
        this.spawnRaidBoss();
        this.addToCombatLog(`Starting ${raid.name}!`);
        this.showNotification('Raid Started!', `You are now fighting ${raid.boss.name}!`);
        
        return true;
    }
    
    spawnRaidBoss() {
        if (!this.currentRaid) return;
        
        this.currentMonster = {
            ...this.currentRaid.boss,
            maxHp: this.currentRaid.currentHp,
            hp: this.currentRaid.currentHp,
            isRaidBoss: true,
            raidType: this.getRaidType()
        };
        
        this.updateMonsterDisplay();
    }
    
    getRaidType() {
        if (!this.currentRaid) return null;
        if (this.raids.daily.find(r => r.id === this.currentRaid.id)) return 'daily';
        if (this.raids.weekly.find(r => r.id === this.currentRaid.id)) return 'weekly';
        if (this.raids.monthly.find(r => r.id === this.currentRaid.id)) return 'monthly';
        return null;
    }
    
    completeRaid() {
        if (!this.currentRaid) return;
        
        const raid = this.raids[this.getRaidType()].find(r => r.id === this.currentRaid.id);
        if (raid) {
            raid.completed = true;
            
            // Give rewards
            const goldReward = Math.floor(raid.rewards.gold * this.player.goldBonus * (1 + this.player.prestigeGoldBonus));
            const expReward = Math.floor(raid.rewards.exp * (1 + this.player.prestigeExpBonus));
            
            this.player.gold += goldReward;
            this.player.exp += expReward;
            
            this.stats.totalGoldEarned += goldReward;
            
            // Add raid items to inventory
            raid.rewards.items.forEach(itemName => {
                this.inventory.push({
                    name: itemName,
                    emoji: this.getItemEmoji(itemName),
                    type: this.getItemType(itemName),
                    damage: this.getItemDamage(itemName),
                    defense: this.getItemDefense(itemName),
                    id: Date.now() + Math.random()
                });
            });
            
            this.addToCombatLog(`Raid completed! Gained ${goldReward} gold and ${expReward} EXP!`);
            this.showNotification('Raid Complete!', `Defeated ${raid.boss.name} and earned amazing rewards!`);
            
            // Check for level up
            if (this.player.exp >= this.player.expToNext) {
                this.levelUp();
            }
            
            // Update achievements
            this.updateAchievementProgress('raid_master', 1);
            
            this.currentRaid = null;
            this.currentMonster = null;
            
            // Spawn normal monster after delay
            setTimeout(() => {
                this.spawnMonster();
            }, 2000);
            
            this.updateAllDisplays();
        }
    }
    
    getItemEmoji(itemName) {
        const itemTexts = {
            'Goblin Crown': 'CROWN',
            'Warlord Axe': 'AXE',
            'Dark Staff': 'STAFF',
            'Dragon Scale Armor': 'DRAGON ARMOR',
            'Dragon Sword': 'DRAGON SWORD',
            'Phoenix Feather': 'PHOENIX FEATHER',
            'Fire Ring': 'FIRE RING',
            'World Destroyer Armor': 'WORLD ARMOR',
            'Legendary Sword': 'LEGENDARY SWORD',
            'Crown of Power': 'POWER CROWN'
        };
        return itemTexts[itemName] || 'ITEM';
    }
    
    getItemType(itemName) {
        if (itemName.includes('Sword') || itemName.includes('Axe') || itemName.includes('Staff')) return 'weapon';
        if (itemName.includes('Armor')) return 'armor';
        return 'accessory';
    }
    
    getItemDamage(itemName) {
        const damageMap = {
            'Warlord Axe': 50,
            'Dark Staff': 75,
            'Dragon Sword': 100,
            'Legendary Sword': 200
        };
        return damageMap[itemName] || 0;
    }
    
    getItemDefense(itemName) {
        const defenseMap = {
            'Dragon Scale Armor': 50,
            'World Destroyer Armor': 100
        };
        return defenseMap[itemName] || 0;
    }
    
    updateRaidAvailability() {
        Object.keys(this.raids).forEach(type => {
            this.raids[type].forEach((raid, index) => {
                if (index === 0) {
                    raid.available = this.canAccessRaid(raid);
                } else {
                    const prevRaid = this.raids[type][index - 1];
                    raid.available = prevRaid.completed && this.canAccessRaid(raid);
                }
            });
        });
    }
    
    updateRaidsDisplay() {
        Object.keys(this.raids).forEach(type => {
            const raidList = document.getElementById(`${type}-raid-list`);
            if (raidList) {
                raidList.innerHTML = '';
                
                this.raids[type].forEach(raid => {
                    const raidEl = document.createElement('div');
                    const status = raid.completed ? 'completed' : (raid.available ? 'available' : 'locked');
                    const statusText = raid.completed ? 'Completed' : (raid.available ? 'Available' : 'Locked');
                    
                    raidEl.className = `raid ${status}`;
                    
                    const requirementsMet = this.canAccessRaid(raid);
                    const requirementsList = `
                        <li class="${this.player.level >= raid.requirements.level ? 'met' : ''}">Level ${raid.requirements.level}</li>
                        <li class="${this.player.gold >= raid.requirements.gold ? 'met' : ''}">${raid.requirements.gold.toLocaleString()} Gold</li>
                        ${raid.requirements.prestige ? `<li class="${this.player.prestigeLevel >= raid.requirements.prestige ? 'met' : ''}">Prestige Level ${raid.requirements.prestige}</li>` : ''}
                    `;
                    
                    const rewardsList = `
                        <div class="raid-reward">GOLD: ${raid.rewards.gold.toLocaleString()}</div>
                        <div class="raid-reward">EXP: ${raid.rewards.exp.toLocaleString()}</div>
                        ${raid.rewards.items.map(item => `<div class="raid-reward">${this.getItemEmoji(item)} ${item}</div>`).join('')}
                    `;
                    
                    raidEl.innerHTML = `
                        <div class="raid-status ${status}">${statusText}</div>
                        <div class="raid-header">
                            <div class="raid-title">
                                <span>${raid.name}</span>
                                <span class="raid-difficulty ${raid.difficulty}">${raid.difficulty.toUpperCase()}</span>
                            </div>
                        </div>
                        ${raid.description ? `<div class="raid-description">${raid.description}</div>` : ''}
                        <div class="raid-boss">
                            <div class="raid-boss-sprite">${raid.boss.sprite}</div>
                            <div class="raid-boss-info">
                                <h4>${raid.boss.name}</h4>
                                <div class="raid-boss-stats">
                                    HP: ${raid.boss.hp.toLocaleString()} | Damage: ${raid.boss.damage} | Level: ${raid.boss.level}
                                </div>
                            </div>
                        </div>
                        <div class="raid-requirements">
                            <h5>Requirements:</h5>
                            <ul>${requirementsList}</ul>
                        </div>
                        <div class="raid-rewards">
                            <div class="raid-reward-list">${rewardsList}</div>
                            <button class="raid-start-btn" ${!raid.available || raid.completed ? 'disabled' : ''}>
                                ${raid.completed ? 'Completed' : (raid.available ? 'Start Raid' : 'Locked')}
                            </button>
                        </div>
                    `;
                    
                    const startBtn = raidEl.querySelector('.raid-start-btn');
                    startBtn.addEventListener('click', () => {
                        if (this.startRaid(type, raid.id)) {
                            this.createParticles(raidEl.getBoundingClientRect().left + raidEl.getBoundingClientRect().width/2, 
                                               raidEl.getBoundingClientRect().top + raidEl.getBoundingClientRect().height/2);
                        }
                    });
                    
                    raidList.appendChild(raidEl);
                });
            }
        });
    }
    
    updateRaidTimers() {
        const now = Date.now();
        
        // Daily raid timer
        const timeUntilDailyReset = 24 * 60 * 60 * 1000 - (now - this.lastDailyRaidReset) % (24 * 60 * 60 * 1000);
        const dailyHours = Math.floor(timeUntilDailyReset / (60 * 60 * 1000));
        const dailyMinutes = Math.floor((timeUntilDailyReset % (60 * 60 * 1000)) / (60 * 1000));
        const dailySeconds = Math.floor((timeUntilDailyReset % (60 * 1000)) / 1000);
        
        const dailyTimer = document.getElementById('daily-raid-timer');
        if (dailyTimer) {
            dailyTimer.textContent = `${dailyHours.toString().padStart(2, '0')}:${dailyMinutes.toString().padStart(2, '0')}:${dailySeconds.toString().padStart(2, '0')}`;
        }
        
        // Weekly raid timer
        const timeUntilWeeklyReset = 7 * 24 * 60 * 60 * 1000 - (now - this.lastWeeklyRaidReset) % (7 * 24 * 60 * 60 * 1000);
        const weeklyDays = Math.floor(timeUntilWeeklyReset / (24 * 60 * 60 * 1000));
        const weeklyHours = Math.floor((timeUntilWeeklyReset % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const weeklyMinutes = Math.floor((timeUntilWeeklyReset % (60 * 60 * 1000)) / (60 * 1000));
        
        const weeklyTimer = document.getElementById('weekly-raid-timer');
        if (weeklyTimer) {
            weeklyTimer.textContent = `${weeklyDays}d ${weeklyHours.toString().padStart(2, '0')}:${weeklyMinutes.toString().padStart(2, '0')}`;
        }
        
        // Monthly raid timer
        const timeUntilMonthlyReset = 30 * 24 * 60 * 60 * 1000 - (now - this.lastMonthlyRaidReset) % (30 * 24 * 60 * 60 * 1000);
        const monthlyDays = Math.floor(timeUntilMonthlyReset / (24 * 60 * 60 * 1000));
        const monthlyHours = Math.floor((timeUntilMonthlyReset % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const monthlyMinutes = Math.floor((timeUntilMonthlyReset % (60 * 60 * 1000)) / (60 * 1000));
        
        const monthlyTimer = document.getElementById('monthly-raid-timer');
        if (monthlyTimer) {
            monthlyTimer.textContent = `${monthlyDays}d ${monthlyHours.toString().padStart(2, '0')}:${monthlyMinutes.toString().padStart(2, '0')}`;
        }
    }
    
    resetRaid(type) {
        const resetMap = {
            'daily': 'lastDailyRaidReset',
            'weekly': 'lastWeeklyRaidReset',
            'monthly': 'lastMonthlyRaidReset'
        };
        
        this[resetMap[type]] = Date.now();
        this.raids[type].forEach(raid => {
            raid.completed = false;
            raid.available = false;
        });
        
        // Make first raid available if requirements are met
        if (this.raids[type].length > 0) {
            this.raids[type][0].available = this.canAccessRaid(this.raids[type][0]);
        }
        
        this.updateRaidsDisplay();
        this.showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} Raids Reset!`, 'New raids are now available!');
    }

    // Prestige System Methods
    canPrestige() {
        return this.player.level >= 50 && 
               this.player.gold >= 10000 && 
               this.achievements.filter(a => a.unlocked).length >= 3;
    }
    
    prestige() {
        if (!this.canPrestige()) return false;
        
        this.player.prestigeLevel++;
        this.player.prestigeGoldBonus += 0.5; // +50% gold gain
        this.player.prestigeExpBonus += 0.25; // +25% exp gain
        
        // Reset player progress
        this.player.level = 1;
        this.player.hp = 100;
        this.player.maxHp = 100;
        this.player.strength = 10;
        this.player.defense = 5;
        this.player.gold = 0;
        this.player.exp = 0;
        this.player.expToNext = 100;
        
        // Reset skills
        Object.keys(this.skills).forEach(skill => {
            this.skills[skill].level = 0;
        });
        
        // Reset equipment
        this.equipment = {
            weapon: { name: 'Rusty Sword', damage: 5, cost: 0 },
            armor: { name: 'Cloth Armor', defense: 2, cost: 0 },
            accessory: null
        };
        
        // Reset inventory
        this.inventory = [];
        
        this.playSound('achievement');
        this.showNotification('Prestige Complete!', `You are now prestige level ${this.player.prestigeLevel}!`);
        
        this.updateAchievementProgress('prestige_master', 1);
        this.updateAllDisplays();
        
        return true;
    }
    
    updatePrestigeDisplay() {
        const prestigeBtn = document.getElementById('prestige-btn');
        const canPrestige = this.canPrestige();
        
        if (canPrestige) {
            prestigeBtn.disabled = false;
            prestigeBtn.textContent = `Prestige (Level ${this.player.prestigeLevel + 1})`;
            prestigeBtn.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
        } else {
            prestigeBtn.disabled = true;
            prestigeBtn.textContent = 'Prestige Not Available';
            prestigeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    }
    
    // Stats Tracking Methods
    updateStatsDisplay() {
        document.getElementById('stat-monsters-defeated').textContent = this.stats.monstersDefeated.toLocaleString();
        document.getElementById('stat-damage-dealt').textContent = this.stats.totalDamageDealt.toLocaleString();
        document.getElementById('stat-crit-hits').textContent = this.stats.criticalHits.toLocaleString();
        document.getElementById('stat-highest-damage').textContent = this.stats.highestDamage.toLocaleString();
        document.getElementById('stat-gold-earned').textContent = this.stats.totalGoldEarned.toLocaleString();
        document.getElementById('stat-gold-spent').textContent = this.stats.goldSpent.toLocaleString();
        document.getElementById('stat-items-purchased').textContent = this.stats.itemsPurchased.toLocaleString();
        document.getElementById('stat-skills-upgraded').textContent = this.stats.skillsUpgraded.toLocaleString();
        
        const timePlayed = Math.floor((Date.now() - this.gameStartTime) / 1000);
        const hours = Math.floor(timePlayed / 3600);
        const minutes = Math.floor((timePlayed % 3600) / 60);
        const seconds = timePlayed % 60;
        
        document.getElementById('stat-time-played').textContent = 
            hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}m ${seconds}s`;
        
        document.getElementById('stat-game-started').textContent = this.stats.gameStarted;
        
        const unlockedAchievements = this.achievements.filter(a => a.unlocked).length;
        document.getElementById('stat-achievements').textContent = `${unlockedAchievements}/${this.achievements.length}`;
        
        document.getElementById('stat-prestige-level').textContent = this.player.prestigeLevel;
        
        // Update time played achievement
        this.updateAchievementProgress('time_played', timePlayed - this.stats.timePlayed);
        this.stats.timePlayed = timePlayed;
    }
    
    updateAchievementsDisplay() {
        const achievementsList = document.getElementById('achievements-list');
        achievementsList.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
            
            const progressPercent = Math.min(100, (achievement.progress / achievement.target) * 100);
            
            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h3>${achievement.name}</h3>
                    <div class="achievement-description">${achievement.description}</div>
                    <div class="achievement-progress">${achievement.progress}/${achievement.target} (${progressPercent.toFixed(0)}%)</div>
                </div>
            `;
            
            achievementsList.appendChild(achievementEl);
        });
    }
    
    showDamageNumber(damage, isCrit = false, isHeal = false) {
        const damageNumbers = document.getElementById('damage-numbers');
        const damageEl = document.createElement('div');
        damageEl.className = `damage-number ${isCrit ? 'crit' : ''} ${isHeal ? 'heal' : ''}`;
        damageEl.textContent = damage;
        
        // Random position in combat area
        const combatArea = document.querySelector('.combat-area');
        const rect = combatArea.getBoundingClientRect();
        
        damageEl.style.left = (rect.left + Math.random() * rect.width) + 'px';
        damageEl.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        damageNumbers.appendChild(damageEl);
        
        // Remove after animation
        setTimeout(() => {
            damageEl.remove();
        }, 2000);
    }
    
    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <div style="font-size: 0.9em;">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    addToCombatLog(message) {
        this.combatLog.push(message);
        if (this.combatLog.length > 5) {
            this.combatLog.shift();
        }
        
        const combatLog = this.domCache.combatLog || document.getElementById('combat-log');
        if (combatLog) {
            combatLog.innerHTML = this.combatLog.map(msg => `<div>${msg}</div>`).join('');
            combatLog.scrollTop = combatLog.scrollHeight;
        }
    }
    
    createParticles(x, y, count = 10) {
        const particles = document.getElementById('particles');
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = `hsl(${Math.random() * 60 + 30}, 70%, 60%)`;
            
            particles.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }
    
    startGameLoop() {
        // Optimize game loop to run less frequently
        let lastUpdate = Date.now();
        
        const gameLoop = () => {
            const now = Date.now();
            const deltaTime = now - lastUpdate;
            
            // Only update every 100ms
            if (deltaTime < 100) {
                requestAnimationFrame(gameLoop);
                return;
            }
            
            lastUpdate = now;
            
            // Auto attack
            if (this.player.autoAttack && now - this.lastAutoAttack > this.autoAttackInterval) {
                if (this.currentLocation === 'battle') {
                    this.attack();
                }
                this.lastAutoAttack = now;
            }
            
            // Health regeneration
            if (this.player.healthRegen > 0 && now - this.lastHealthRegen > this.healthRegenInterval) {
                if (this.player.hp < this.player.maxHp) {
                    const regenAmount = Math.min(this.player.healthRegen, this.player.maxHp - this.player.hp);
                    this.player.hp += regenAmount;
                    this.updatePlayerDisplay();
                }
                this.lastHealthRegen = now;
            }
            
            requestAnimationFrame(gameLoop);
        };
        
        requestAnimationFrame(gameLoop);
    }
    
    saveGame() {
        const saveData = {
            player: this.player,
            equipment: this.equipment,
            skills: this.skills,
            inventory: this.inventory,
            achievements: this.achievements,
            quests: this.quests,
            raids: this.raids,
            stats: this.stats,
            tutorial: this.tutorial,
            gameStartTime: this.gameStartTime,
            lastQuestReset: this.lastQuestReset,
            lastDailyRaidReset: this.lastDailyRaidReset,
            lastWeeklyRaidReset: this.lastWeeklyRaidReset,
            lastMonthlyRaidReset: this.lastMonthlyRaidReset,
            currentLocation: this.currentLocation
        };
        
        localStorage.setItem('idleRpgSave', JSON.stringify(saveData));
        this.showNotification('Game Saved', 'Your progress has been saved!');
    }
    
    loadGame() {
        const saveData = localStorage.getItem('idleRpgSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            
            this.player = data.player || this.player;
            this.equipment = data.equipment || this.equipment;
            this.skills = data.skills || this.skills;
            this.inventory = data.inventory || this.inventory;
            this.achievements = data.achievements || this.achievements;
            this.quests = data.quests || this.quests;
            this.raids = data.raids || this.raids;
            this.stats = data.stats || this.stats;
            this.tutorial = data.tutorial || this.tutorial;
            this.gameStartTime = data.gameStartTime || this.gameStartTime;
            this.lastQuestReset = data.lastQuestReset || this.lastQuestReset;
            this.lastDailyRaidReset = data.lastDailyRaidReset || this.lastDailyRaidReset;
            this.lastWeeklyRaidReset = data.lastWeeklyRaidReset || this.lastWeeklyRaidReset;
            this.lastMonthlyRaidReset = data.lastMonthlyRaidReset || this.lastMonthlyRaidReset;
            this.currentLocation = data.currentLocation || this.currentLocation;
            
            // Reapply skill effects
            this.player.autoAttack = this.skills['auto-attack'].level > 0;
            this.player.critChance = 0.05 + (this.skills['crit-chance'].level * 0.03);
            this.player.goldBonus = 1.0 + (this.skills['gold-bonus'].level * 0.1);
            this.player.healthRegen = this.skills['health-regen'].level * 2;
            
            this.updateAllDisplays();
            this.showNotification('Game Loaded', 'Your progress has been restored!');
        } else {
            this.showNotification('No Save Found', 'No saved game data found.');
        }
    }
    
    resetGame() {
        if (confirm('Are you sure you want to reset your game? This cannot be undone!')) {
            localStorage.removeItem('idleRpgSave');
            location.reload();
        }
    }
    
    updateAllDisplays() {
        this.updatePlayerDisplay();
        this.updateMonsterDisplay();
        this.updateSkillDisplay();
        this.updateEquipmentDisplay();
        this.updateInventoryDisplay();
        this.updateAchievementsDisplay();
        this.updateQuestsDisplay();
        this.updateRaidAvailability();
        this.updateRaidsDisplay();
        this.updatePrestigeDisplay();
        this.updateStatsDisplay();
        this.updateLocationDisplay();
        this.updateCurrentLocationName();
    }
}

// Helper function to create SVG icon
function createSVGIcon(iconId, size = 40) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 80 80');
    
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${iconId}`);
    svg.appendChild(use);
    
    return svg;
}

// Helper function to get SVG icon HTML string
function getSVGIconHTML(iconId, size = 40) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 80 80"><use xlink:href="#${iconId}"></use></svg>`;
}

// Shop items data
const shopItems = {
    weapons: [
        { name: 'Rusty Dagger', icon: 'icon-dagger', damage: 8, cost: 50, type: 'weapon', description: 'Better than nothing' },
        { name: 'Iron Sword', icon: 'icon-sword', damage: 15, cost: 150, type: 'weapon', description: 'A sturdy iron blade' },
        { name: 'Steel Sword', icon: 'icon-sword', damage: 25, cost: 400, type: 'weapon', description: 'Sharp steel weapon' },
        { name: 'Silver Blade', icon: 'icon-sword', damage: 35, cost: 800, type: 'weapon', description: 'Blessed silver sword' },
        { name: 'Magic Blade', icon: 'icon-sword', damage: 50, cost: 1500, type: 'weapon', description: 'Enchanted with mystical power' },
        { name: 'Flaming Sword', icon: 'icon-sword', damage: 70, cost: 3000, type: 'weapon', description: 'Burns enemies on contact' },
        { name: 'Dragon Slayer', icon: 'icon-sword', damage: 100, cost: 6000, type: 'weapon', description: 'Legendary weapon of power' },
        { name: 'Demon Blade', icon: 'icon-sword', damage: 140, cost: 12000, type: 'weapon', description: 'Forged in the depths of hell' },
        { name: 'Excalibur', icon: 'icon-sword', damage: 200, cost: 25000, type: 'weapon', description: 'The legendary sword of kings' }
    ],
    armor: [
        { name: 'Cloth Armor', icon: 'icon-armor', defense: 3, cost: 40, type: 'armor', description: 'Basic cloth protection' },
        { name: 'Leather Armor', icon: 'icon-shield', defense: 8, cost: 120, type: 'armor', description: 'Basic leather protection' },
        { name: 'Chain Mail', icon: 'icon-armor', defense: 15, cost: 350, type: 'armor', description: 'Metal chain protection' },
        { name: 'Iron Plate', icon: 'icon-shield', defense: 25, cost: 750, type: 'armor', description: 'Heavy iron plating' },
        { name: 'Steel Plate', icon: 'icon-armor', defense: 40, cost: 1500, type: 'armor', description: 'Reinforced steel armor' },
        { name: 'Mithril Mail', icon: 'icon-armor', defense: 60, cost: 3500, type: 'armor', description: 'Lightweight but strong' },
        { name: 'Dragon Scale', icon: 'icon-shield', defense: 90, cost: 7000, type: 'armor', description: 'Armor forged from dragon scales' },
        { name: 'Demon Plate', icon: 'icon-armor', defense: 130, cost: 15000, type: 'armor', description: 'Cursed armor of power' },
        { name: 'Divine Aegis', icon: 'icon-shield', defense: 180, cost: 30000, type: 'armor', description: 'Blessed by the gods' }
    ],
    accessories: [
        { name: 'Copper Ring', icon: 'icon-ring', strength: 3, cost: 100, type: 'accessory', description: 'Slight strength boost' },
        { name: 'Power Ring', icon: 'icon-ring', strength: 8, cost: 300, type: 'accessory', description: 'Increases strength' },
        { name: 'Defense Amulet', icon: 'icon-amulet', defense: 5, cost: 250, type: 'accessory', description: 'Boosts defense' },
        { name: 'Gold Ring', icon: 'icon-ring', goldBonus: 0.2, cost: 600, type: 'accessory', description: '+20% gold gain' },
        { name: 'Lucky Charm', icon: 'icon-amulet', critChance: 0.1, cost: 1000, type: 'accessory', description: '+10% crit chance' },
        { name: 'Ruby Amulet', icon: 'icon-amulet', strength: 15, cost: 2000, type: 'accessory', description: 'Powerful strength boost' },
        { name: 'Emerald Ring', icon: 'icon-ring', defense: 12, cost: 2000, type: 'accessory', description: 'Strong defense boost' },
        { name: 'Golden Crown', icon: 'icon-crown', goldBonus: 0.5, cost: 5000, type: 'accessory', description: '+50% gold gain' },
        { name: 'Phoenix Feather', icon: 'icon-amulet', critChance: 0.25, cost: 8000, type: 'accessory', description: '+25% crit chance' }
    ],
    consumables: [
        { name: 'Minor Heal Potion', icon: 'icon-health-potion', cost: 30, type: 'consumable', consumableType: 'healPotion', description: 'Restores 50% HP' },
        { name: 'Poison Vial', icon: 'icon-poison-potion', cost: 50, type: 'consumable', consumableType: 'poisonPotion', description: 'Deals 30% monster HP' },
        { name: 'Strength Potion', icon: 'icon-strength-potion', cost: 80, type: 'consumable', consumableType: 'strengthPotion', description: '+20% damage temporarily' },
        { name: 'Defense Potion', icon: 'icon-strength-potion', cost: 80, type: 'consumable', consumableType: 'defensePotion', description: '+20% defense temporarily' }
    ]
};

// Initialize game
let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new GameState();
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + '-panel').classList.add('active');
        });
    });
    
    // Skill purchases
    document.querySelectorAll('.skill-node').forEach(node => {
        node.addEventListener('click', () => {
            const skillName = node.dataset.skill;
            if (game.purchaseSkill(skillName)) {
                // Create particles effect
                const rect = node.getBoundingClientRect();
                game.createParticles(rect.left + rect.width/2, rect.top + rect.height/2);
            }
        });
    });
    
    // Shop category switching
    document.querySelectorAll('.shop-category').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.shop-category').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            const shopContainer = document.getElementById('shop-items');
            if (!shopContainer) {
                console.log('Shop items container not found');
                return;
            }
            
            // Clear content immediately without fade to prevent white flash
            shopContainer.innerHTML = '';
            
            // Use the shopItems data from the global constant
            if (!shopItems || !shopItems[category]) {
                console.log('No shop items found for category:', category);
                return;
            }
            
            shopItems[category].forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'shop-item';
                
                let statsText = '';
                if (item.damage) statsText += `Damage: +${item.damage} `;
                if (item.defense) statsText += `Defense: +${item.defense} `;
                if (item.strength) statsText += `Strength: +${item.strength} `;
                if (item.goldBonus) statsText += `Gold Bonus: +${(item.goldBonus * 100).toFixed(0)}% `;
                if (item.critChance) statsText += `Crit Chance: +${(item.critChance * 100).toFixed(0)}% `;
                
                const iconHTML = item.icon ? getSVGIconHTML(item.icon, 60) : getSVGIconHTML('icon-sword', 60);
                
                itemEl.innerHTML = `
                    <div style="text-align: center; margin-bottom: 10px;">${iconHTML}</div>
                    <div class="shop-item-name">${item.name}</div>
                    <div class="shop-item-stats">${statsText}</div>
                    <div style="opacity: 0.8; font-size: 0.9em; margin-bottom: 10px;">${item.description}</div>
                    <div class="shop-item-cost">
                        <span style="display: flex; align-items: center; gap: 5px;">Cost: ${item.cost.toLocaleString()} ${getSVGIconHTML('icon-gold', 20)}</span>
                        <button class="buy-btn" ${game.player.gold < item.cost ? 'disabled' : ''}>
                            Buy
                        </button>
                    </div>
                `;
                
                const buyBtn = itemEl.querySelector('.buy-btn');
                buyBtn.addEventListener('click', () => {
                    if (game.purchaseItem(item)) {
                        // Update button state
                        buyBtn.disabled = game.player.gold < item.cost;
                        buyBtn.textContent = game.player.gold < item.cost ? 'Insufficient Gold' : 'Buy';
                        
                        // Create particles effect
                        const rect = itemEl.getBoundingClientRect();
                        game.createParticles(rect.left + rect.width/2, rect.top + rect.height/2);
                    }
                });
                
                shopContainer.appendChild(itemEl);
            });
            
        });
    });
    
    // Initialize shop with weapons
    document.querySelector('[data-category="weapons"]').click();
    
    // Save/Load buttons
    document.getElementById('save-btn').addEventListener('click', () => game.saveGame());
    document.getElementById('load-btn').addEventListener('click', () => game.loadGame());
    document.getElementById('reset-btn').addEventListener('click', () => game.resetGame());
    
    // Combat area event listeners will be set up dynamically when navigating to battle area
    
    // Tutorial controls
    const tutorialNext = document.getElementById('tutorial-next');
    const tutorialPrev = document.getElementById('tutorial-prev');
    const tutorialClose = document.getElementById('tutorial-close');
    const tutorialBtn = document.getElementById('tutorial-btn');
    
    if (tutorialNext) tutorialNext.addEventListener('click', () => game.nextTutorialStep());
    if (tutorialPrev) tutorialPrev.addEventListener('click', () => game.prevTutorialStep());
    if (tutorialClose) tutorialClose.addEventListener('click', () => game.skipTutorial());
    if (tutorialBtn) tutorialBtn.addEventListener('click', () => game.startTutorial());
    // Help system
    const helpBtn = document.getElementById('help-btn');
    const helpClose = document.getElementById('close-help');
    
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            const helpPanel = document.getElementById('help-panel');
            if (helpPanel) helpPanel.style.display = 'block';
        });
    }
    
    if (helpClose) {
        helpClose.addEventListener('click', () => {
            const helpPanel = document.getElementById('help-panel');
            if (helpPanel) helpPanel.style.display = 'none';
        });
    }
    
    // Stats panel
    const statsBtn = document.getElementById('stats-btn');
    const statsClose = document.getElementById('stats-close');
    
    if (statsBtn) {
        statsBtn.addEventListener('click', () => {
            const statsPanel = document.getElementById('stats-panel');
            if (statsPanel) {
                statsPanel.style.display = 'block';
                game.updateStatsDisplay();
            }
        });
    }
    
    if (statsClose) {
        statsClose.addEventListener('click', () => {
            const statsPanel = document.getElementById('stats-panel');
            if (statsPanel) statsPanel.style.display = 'none';
        });
    }
    
    // Prestige system
    document.getElementById('prestige-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to prestige? This will reset your level, skills, and equipment, but give you permanent bonuses!')) {
            game.prestige();
        }
    });
    
    // Quest timer update
    setInterval(() => {
        game.updateQuestTimer();
    }, 1000);
    
    // Quest reset check (every minute)
    setInterval(() => {
        const now = Date.now();
        const timeSinceLastReset = now - game.lastQuestReset;
        if (timeSinceLastReset >= 24 * 60 * 60 * 1000) {
            game.resetQuests();
        }
    }, 60000);
    
    // World Map Navigation - Set up event listeners
    function setupMapEventListeners() {
        console.log('Setting up map event listeners...');
        const locations = document.querySelectorAll('.map-location');
        console.log('Found', locations.length, 'map locations');
        
        locations.forEach(location => {
            console.log('Setting up event listener for:', location.dataset.location);
            location.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Location clicked:', location.dataset.location);
                const locationId = location.dataset.location;
                if (game && game.navigateToLocation) {
                    game.navigateToLocation(locationId);
                } else {
                    console.error('Game or navigateToLocation method not found');
                }
            });
        });
    }
    
    // Call the function to set up event listeners
    setupMapEventListeners();
    
    // Back to map navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.action === 'back-to-map') {
                game.backToMap();
            }
        });
    });
    
    // Raid category switching
    document.querySelectorAll('.raid-category').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.raid-category').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.raid-content').forEach(c => c.style.display = 'none');
            
            btn.classList.add('active');
            const raidType = btn.dataset.raidType;
            document.getElementById(`${raidType}-raids`).style.display = 'block';
        });
    });
    
    // Raid timer updates (every second)
    setInterval(() => {
        game.updateRaidTimers();
    }, 1000);
    
    // Raid reset checks (every minute)
    setInterval(() => {
        const now = Date.now();
        
        // Daily raid reset
        if (now - game.lastDailyRaidReset >= 24 * 60 * 60 * 1000) {
            game.resetRaid('daily');
        }
        
        // Weekly raid reset
        if (now - game.lastWeeklyRaidReset >= 7 * 24 * 60 * 60 * 1000) {
            game.resetRaid('weekly');
        }
        
        // Monthly raid reset
        if (now - game.lastMonthlyRaidReset >= 30 * 24 * 60 * 60 * 1000) {
            game.resetRaid('monthly');
        }
    }, 60000);
    
    // Stats update (every 5 seconds)
    setInterval(() => {
        game.updateStatsDisplay();
    }, 5000);
    
    // Auto-save every 30 seconds
    setInterval(() => {
        game.saveGame();
    }, 30000);
    
    // Try to load saved game on startup
    game.loadGame();
    
    // Start tutorial if first time playing
    if (!game.tutorial.completed) {
        setTimeout(() => {
            game.startTutorial();
        }, 1000);
    }
    
    console.log('Enhanced Idle RPG Game initialized!');
});

