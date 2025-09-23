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
            healthRegen: 0
        };
        
        this.equipment = {
            weapon: { name: 'Rusty Sword', damage: 5, cost: 0 },
            armor: { name: 'Cloth Armor', defense: 2, cost: 0 },
            accessory: null
        };
        
        this.skills = {
            'auto-attack': { level: 0, maxLevel: 10 },
            'crit-chance': { level: 0, maxLevel: 10 },
            'gold-bonus': { level: 0, maxLevel: 10 },
            'health-regen': { level: 0, maxLevel: 10 }
        };
        
        this.inventory = [];
        this.achievements = this.initializeAchievements();
        this.currentMonster = null;
        this.combatLog = [];
        this.gameStartTime = Date.now();
        
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
            { id: 'first_kill', name: 'First Blood', description: 'Defeat your first monster', icon: '⚔️', unlocked: false, progress: 0, target: 1 },
            { id: 'level_5', name: 'Rising Star', description: 'Reach level 5', icon: '⭐', unlocked: false, progress: 0, target: 5 },
            { id: 'rich_1000', name: 'Wealthy Warrior', description: 'Accumulate 1000 gold', icon: '💰', unlocked: false, progress: 0, target: 1000 },
            { id: 'skill_master', name: 'Skill Master', description: 'Max out a skill', icon: '🎯', unlocked: false, progress: 0, target: 1 },
            { id: 'monster_slayer', name: 'Monster Slayer', description: 'Defeat 100 monsters', icon: '👹', unlocked: false, progress: 0, target: 100 },
            { id: 'equipment_collector', name: 'Equipment Collector', description: 'Own 10 different items', icon: '⚔️', unlocked: false, progress: 0, target: 10 }
        ];
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
            { name: 'Baby Dragon', emoji: '🐲', hp: 50, damage: 8, gold: 25, exp: 20 },
            { name: 'Goblin', emoji: '👹', hp: 30, damage: 5, gold: 15, exp: 12 },
            { name: 'Orc', emoji: '👹', hp: 80, damage: 12, gold: 40, exp: 35 },
            { name: 'Skeleton', emoji: '💀', hp: 25, damage: 4, gold: 12, exp: 10 },
            { name: 'Dark Mage', emoji: '🧙‍♂️', hp: 60, damage: 15, gold: 50, exp: 45 },
            { name: 'Giant Spider', emoji: '🕷️', hp: 40, damage: 7, gold: 20, exp: 18 },
            { name: 'Minotaur', emoji: '🐂', hp: 120, damage: 20, gold: 75, exp: 60 },
            { name: 'Phoenix', emoji: '🔥', hp: 90, damage: 18, gold: 60, exp: 50 }
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
        this.updateMonsterDisplay();
    }
    
    updateMonsterDisplay() {
        const monsterSprite = document.getElementById('monster-sprite');
        const monsterName = document.getElementById('monster-name');
        const monsterHpFill = document.getElementById('monster-hp-fill');
        const monsterHpText = document.getElementById('monster-hp-text');
        
        if (this.currentMonster) {
            monsterSprite.textContent = this.currentMonster.emoji;
            monsterName.textContent = this.currentMonster.name;
            
            const hpPercent = (this.currentMonster.hp / this.currentMonster.maxHp) * 100;
            monsterHpFill.style.width = hpPercent + '%';
            monsterHpText.textContent = `${this.currentMonster.hp}/${this.currentMonster.maxHp}`;
        }
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
        if (!this.currentMonster || this.currentMonster.hp <= 0) return;
        
        const weaponDamage = this.equipment.weapon ? this.equipment.weapon.damage : 0;
        const baseDamage = this.player.strength + weaponDamage;
        
        // Critical hit calculation
        const isCrit = Math.random() < this.player.critChance;
        const damage = Math.floor(baseDamage * (isCrit ? 2.5 : 1));
        
        this.currentMonster.hp -= damage;
        this.showDamageNumber(damage, isCrit);
        this.playSound(isCrit ? 'crit' : 'attack');
        
        this.addToCombatLog(`${isCrit ? 'CRITICAL HIT! ' : ''}You deal ${damage} damage!`);
        
        if (this.currentMonster.hp <= 0) {
            this.defeatMonster();
        } else {
            // Monster counter-attack
            setTimeout(() => this.monsterAttack(), 500);
        }
        
        this.updateMonsterDisplay();
        this.updateAchievementProgress('monster_slayer', 1);
    }
    
    monsterAttack() {
        if (!this.currentMonster) return;
        
        const armorDefense = this.equipment.armor ? this.equipment.armor.defense : 0;
        const totalDefense = this.player.defense + armorDefense;
        const damage = Math.max(1, this.currentMonster.damage - totalDefense);
        
        this.player.hp -= damage;
        this.showDamageNumber(damage, false, true);
        
        this.addToCombatLog(`${this.currentMonster.name} deals ${damage} damage!`);
        
        if (this.player.hp <= 0) {
            this.player.hp = 1; // Prevent death for now
            this.addToCombatLog('You are knocked unconscious!');
        }
        
        this.updatePlayerDisplay();
    }
    
    defeatMonster() {
        const goldReward = Math.floor(this.currentMonster.gold * this.player.goldBonus);
        const expReward = this.currentMonster.exp;
        
        this.player.gold += goldReward;
        this.player.exp += expReward;
        
        this.addToCombatLog(`You defeated ${this.currentMonster.name}!`);
        this.addToCombatLog(`Gained ${goldReward} gold and ${expReward} EXP!`);
        
        // Check for level up
        if (this.player.exp >= this.player.expToNext) {
            this.levelUp();
        }
        
        // Check achievements
        this.updateAchievementProgress('first_kill', 1);
        this.updateAchievementProgress('rich_1000', goldReward);
        
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
        
        this.updateAchievementProgress('level_5', 1);
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
            
            // Add to inventory
            this.inventory.push({ ...item, id: Date.now() });
            
            this.playSound('purchase');
            this.updateInventoryDisplay();
            this.updatePlayerDisplay();
            this.updateAchievementProgress('equipment_collector', 1);
            
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
            gameStartTime: this.gameStartTime
        };
        
        localStorage.setItem('idleRpgSave', JSON.stringify(saveData));
        this.showNotification('Game Saved', 'Your progress has been saved!');
    }
    
    loadGame() {
        const saveData = localStorage.getItem('idleRpgSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            
            this.player = data.player;
            this.equipment = data.equipment;
            this.skills = data.skills;
            this.inventory = data.inventory;
            this.achievements = data.achievements;
            this.gameStartTime = data.gameStartTime;
            
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
            const shopItems = document.getElementById('shop-items');
            shopItems.innerHTML = '';
            
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
                
                shopItems.appendChild(itemEl);
            });
        });
    });
    
    // Initialize shop with weapons
    document.querySelector('[data-category="weapons"]').click();
    
    // Save/Load buttons
    document.getElementById('save-btn').addEventListener('click', () => game.saveGame());
    document.getElementById('load-btn').addEventListener('click', () => game.loadGame());
    document.getElementById('reset-btn').addEventListener('click', () => game.resetGame());
    
    // Combat area click for manual attack
    document.querySelector('.combat-area').addEventListener('click', (e) => {
        if (e.target.closest('.monster-sprite')) {
            game.attack();
        }
    });
    
    // Auto-save every 30 seconds
    setInterval(() => {
        game.saveGame();
    }, 30000);
    
    // Try to load saved game on startup
    game.loadGame();
    
    console.log('Idle RPG Game initialized!');
});

