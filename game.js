// Game state and configuration
class GameState {
    constructor() {
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
        this.spawnMonster();
        this.startGameLoop();
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
        if (locationId === 'battle') {
            this.setupBattleEventListeners();
        } else if (locationId === 'shop') {
            this.setupShopEventListeners();
        }
    }
    
    setupBattleEventListeners() {
        const combatArea = document.querySelector('.combat-area');
        const monsterSprite = document.getElementById('monster-sprite');
        
        if (combatArea && !combatArea.hasAttribute('data-listeners-setup')) {
            combatArea.addEventListener('click', (e) => {
                if (e.target.closest('.monster-sprite')) {
                    console.log('Monster clicked - attacking!');
                    this.attack();
                }
            });
            combatArea.setAttribute('data-listeners-setup', 'true');
            console.log('Battle event listeners set up');
        }
        
        // Also add direct click listener to monster sprite
        if (monsterSprite && !monsterSprite.hasAttribute('data-listeners-setup')) {
            monsterSprite.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Monster sprite clicked directly - attacking!');
                this.attack();
            });
            monsterSprite.setAttribute('data-listeners-setup', 'true');
            console.log('Monster sprite event listener set up');
        }
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
        const monsterSprite = document.getElementById('monster-sprite');
        const monsterName = document.getElementById('monster-name');
        const monsterHpFill = document.getElementById('monster-hp-fill');
        const monsterHpText = document.getElementById('monster-hp-text');
        
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
                
                // Add click event listener directly to the SVG
                spriteClone.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('SVG monster sprite clicked - attacking!');
                    this.attack();
                });
                
                monsterSprite.appendChild(spriteClone);
                console.log('Monster sprite loaded:', this.currentMonster.name);
            } else {
                // Fallback to text if sprite not found
                monsterSprite.textContent = this.currentMonster.sprite || 'MONSTER';
                console.log('Sprite not found, using text fallback');
            }
            
            monsterName.textContent = this.currentMonster.name;
            
            const hpPercent = (this.currentMonster.hp / this.currentMonster.maxHp) * 100;
            monsterHpFill.style.width = hpPercent + '%';
            monsterHpText.textContent = `${this.currentMonster.hp}/${this.currentMonster.maxHp}`;
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
    
    updatePlayerDisplay() {
        document.getElementById('player-level').textContent = this.player.level;
        document.getElementById('player-hp').textContent = this.player.hp;
        document.getElementById('player-max-hp').textContent = this.player.maxHp;
        document.getElementById('player-strength').textContent = this.player.strength;
        document.getElementById('player-defense').textContent = this.player.defense;
        document.getElementById('player-gold').textContent = this.player.gold.toLocaleString();
        document.getElementById('player-gems').textContent = this.player.gems;
    }
    
    attack() {
        console.log('Attack function called');
        if (!this.currentMonster || this.currentMonster.hp <= 0) {
            console.log('No valid monster to attack');
            return;
        }
        
        const weaponDamage = this.equipment.weapon ? this.equipment.weapon.damage : 0;
        const baseDamage = this.player.strength + weaponDamage;
        
        // Critical hit calculation
        const isCrit = Math.random() < this.player.critChance;
        const damage = Math.floor(baseDamage * (isCrit ? 2.5 : 1));
        
        // Player attack animation
        const playerSprite = document.getElementById('player-sprite');
        playerSprite.classList.add('attacking');
        
        // Show damage after animation
        setTimeout(() => {
            this.currentMonster.hp -= damage;
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
        if (!skill || skill.level >= skill.maxLevel) return false;
        
        const baseCosts = {
            'auto-attack': 100,
            'crit-chance': 250,
            'gold-bonus': 500,
            'health-regen': 300
        };
        
        const cost = baseCosts[skillName] * Math.pow(1.5, skill.level);
        
        if (this.player.gold >= cost) {
            this.player.gold -= cost;
            skill.level++;
            
            // Update stats
            this.stats.goldSpent += cost;
            this.stats.skillsUpgraded++;
            
            // Apply skill effects
            switch (skillName) {
                case 'auto-attack':
                    this.player.autoAttack = skill.level > 0;
                    break;
                case 'crit-chance':
                    this.player.critChance = 0.05 + (skill.level * 0.03);
                    break;
                case 'gold-bonus':
                    this.player.goldBonus = 1.0 + (skill.level * 0.1);
                    break;
                case 'health-regen':
                    this.player.healthRegen = skill.level * 2;
                    break;
            }
            
            this.playSound('purchase');
            this.updateSkillDisplay();
            this.updatePlayerDisplay();
            this.updateAchievementProgress('skill_master', skill.level === skill.maxLevel ? 1 : 0);
            
            return true;
        }
        
        return false;
    }
    
    updateSkillDisplay() {
        Object.keys(this.skills).forEach(skillName => {
            const skill = this.skills[skillName];
            const skillNode = document.querySelector(`[data-skill="${skillName}"]`);
            const levelNum = skillNode.querySelector('.skill-level-num');
            const costNum = skillNode.querySelector('.skill-cost-num');
            
            levelNum.textContent = skill.level;
            
            const baseCosts = {
                'auto-attack': 100,
                'crit-chance': 250,
                'gold-bonus': 500,
                'health-regen': 300
            };
            
            const cost = baseCosts[skillName] * Math.pow(1.5, skill.level);
            costNum.textContent = cost.toLocaleString();
            
            if (skill.level >= skill.maxLevel) {
                skillNode.classList.add('purchased');
                costNum.textContent = 'MAX';
            } else if (skill.level > 0) {
                skillNode.classList.add('purchased');
            }
        });
    }
    
    purchaseItem(item) {
        if (this.player.gold >= item.cost) {
            this.player.gold -= item.cost;
            
            // Update stats
            this.stats.goldSpent += item.cost;
            this.stats.itemsPurchased++;
            
            // Add to inventory
            this.inventory.push({ ...item, id: Date.now() });
            
            this.playSound('purchase');
            this.updateInventoryDisplay();
            this.updatePlayerDisplay();
            this.updateAchievementProgress('equipment_collector', 1);
            this.updateQuestProgress('buy_equipment', 1);
            
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
                slot.innerHTML = `<div style="font-size: 1.5em;">${item.emoji || '📦'}</div>`;
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
        
        const combatLog = document.getElementById('combat-log');
        combatLog.innerHTML = this.combatLog.map(msg => `<div>${msg}</div>`).join('');
        combatLog.scrollTop = combatLog.scrollHeight;
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
        setInterval(() => {
            // Auto attack
            if (this.player.autoAttack && Date.now() - this.lastAutoAttack > this.autoAttackInterval) {
                this.attack();
                this.lastAutoAttack = Date.now();
            }
            
            // Health regeneration
            if (this.player.healthRegen > 0 && Date.now() - this.lastHealthRegen > this.healthRegenInterval) {
                if (this.player.hp < this.player.maxHp) {
                    const regenAmount = Math.min(this.player.healthRegen, this.player.maxHp - this.player.hp);
                    this.player.hp += regenAmount;
                    this.updatePlayerDisplay();
                    this.showDamageNumber(regenAmount, false, true);
                }
                this.lastHealthRegen = Date.now();
            }
        }, 100);
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

// Shop items data
const shopItems = {
    weapons: [
        { name: 'Iron Sword', emoji: '⚔️', damage: 15, cost: 100, type: 'weapon', description: 'A sturdy iron blade' },
        { name: 'Steel Sword', emoji: '🗡️', damage: 25, cost: 300, type: 'weapon', description: 'Sharp steel weapon' },
        { name: 'Magic Blade', emoji: '✨', damage: 40, cost: 800, type: 'weapon', description: 'Enchanted with mystical power' },
        { name: 'Dragon Slayer', emoji: '🐉', damage: 60, cost: 1500, type: 'weapon', description: 'Legendary weapon of power' }
    ],
    armor: [
        { name: 'Leather Armor', emoji: '🛡️', defense: 5, cost: 80, type: 'armor', description: 'Basic protection' },
        { name: 'Chain Mail', emoji: '🔗', defense: 10, cost: 250, type: 'armor', description: 'Metal chain protection' },
        { name: 'Plate Armor', emoji: '⚔️', defense: 18, cost: 600, type: 'armor', description: 'Heavy metal plating' },
        { name: 'Dragon Scale', emoji: '🐲', defense: 30, cost: 1200, type: 'armor', description: 'Armor forged from dragon scales' }
    ],
    accessories: [
        { name: 'Power Ring', emoji: '💍', strength: 5, cost: 200, type: 'accessory', description: 'Increases strength' },
        { name: 'Defense Amulet', emoji: '🔮', defense: 3, cost: 150, type: 'accessory', description: 'Boosts defense' },
        { name: 'Gold Ring', emoji: '💰', goldBonus: 0.2, cost: 500, type: 'accessory', description: 'Increases gold gain' },
        { name: 'Lucky Charm', emoji: '🍀', critChance: 0.1, cost: 800, type: 'accessory', description: 'Increases critical hit chance' }
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
                
                itemEl.innerHTML = `
                    <div style="font-size: 2rem; text-align: center; margin-bottom: 10px;">${item.emoji}</div>
                    <div class="shop-item-name">${item.name}</div>
                    <div class="shop-item-stats">${statsText}</div>
                    <div style="opacity: 0.8; font-size: 0.9em; margin-bottom: 10px;">${item.description}</div>
                    <div class="shop-item-cost">
                        <span>Cost: ${item.cost.toLocaleString()} 💰</span>
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
    const helpClose = document.getElementById('help-close');
    
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

